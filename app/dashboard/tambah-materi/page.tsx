"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Upload, Plus, Loader2, ImageIcon, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import HorizontalLine from "../uiRama/horizontalLine";
import useFormStore from "../store/useFormStore";
import { useToast } from "@/hooks/use-toast"


import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import SelectField from "../uiRama/selectField";
import ConfirmDialog from "../uiRama/confirmDialog";
import ButtonWithIcon from "../uiRama/buttonWithIcon";
import InputField from "../uiRama/inputField";
import { KeywordsInput } from "./component/keywordInput";

const formSchema = z.object({
  brand: z.string().min(1, "Brand harus dipilih"),
  cluster: z.string().min(1, "Cluster harus dipilih"),
  fitur: z.string().min(1, "Fitur harus dipilih"),
  namaMateri: z.string().min(1, "Nama materi harus diisi"),
  jenis: z.string().min(1, "Jenis harus dipilih"),
  startDate: z.date({ required_error: "Tanggal mulai harus dipilih" }),
  endDate: z.date({ required_error: "Tanggal berakhir harus dipilih" }),
  periode: z.string().min(1, "Periode harus dipilih"),
  linkDokumen: z.string().url({ message: "Masukkan URL yang valid" }),
  tipeMateri: z.enum(["pdf", "video", "dokumen"], {
    message: "Pilih tipe materi yang valid",
  }),
  keywords: z.array(z.string().min(1, "Keyword tidak boleh kosong")),
  thumbnail: z.instanceof(File).optional(),
});

type FormDataType = z.infer<typeof formSchema>;

export default function DocumentForm() {
  const router = useRouter();

  const { toast } = useToast()

  const { startDate, endDate, cluster, fitur, namaMateri, jenis, periode, linkDokumen, tipeMateri, keywords, setField, addKeyword } =
    useFormStore();

  const methods = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: { startDate, endDate, linkDokumen, tipeMateri, keywords, thumbnail: undefined },
  });
  
  const { register, handleSubmit, setValue, reset, formState: { errors } } = methods;

  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormDataType | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file)); 
      setValue("thumbnail", file);
    }
  };

  const onSubmit = async (data: FormDataType) => {
    setIsLoading(true);
    setIsDialogOpen(false);
  
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });
  
      const response = await fetch("http://localhost:5000/api/materi", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Gagal mengirim data");
  
      toast({
        description: "Data berhasil disimpan!",
        className: "bg-green-100 border border-green-300",
      });
  
      reset();
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Gagal menyimpan",
        description: "Terjadi kesalahan, coba lagi nanti.",
        className: "bg-red-100 text-red-800",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => { setFormData(data); setIsDialogOpen(true); })} className="max-w-2xl mx-auto p-6">
        <Card className="mb-2">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-lg font-semibold">Informasi Umum</h3>

            {/* Brand */}
            <SelectField 
              name="brand" 
              label="Brand" 
              options={[
                { value: "brimo", label: "BRImo" }
              ]} 
            />

            {/* Cluster */}
            <SelectField 
              name="cluster" 
              label="Cluster" 
              options={[
                { value: "cluster1", label: "Cluster 1" },
                { value: "cluster2", label: "Cluster 2" }
              ]} 
            />

            {/* Fitur */}
            <SelectField 
              name="fitur" 
              label="Fitur" 
              options={[
                { value: "fitur1", label: "Fitur 1" },
                { value: "fitur2", label: "Fitur 2" }
              ]} 
            />

            {/* Nama Materi */}
            <InputField name="namaMateri" label="Nama Materi" placeholder="Masukkan nama materi" />

            {/* Jenis */}
            <SelectField 
              name="jenis" 
              label="Jenis" 
              options={[
                { value: "jenis1", label: "Jenis 1" },
                { value: "jenis2", label: "Jenis 2" }
              ]} 
            />

            {/* Pilih Tanggal Mulai */}
            <div className="space-y-2">
              <Label>Pilih Tanggal Mulai</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full flex justify-between">
                    {startDate ? format(startDate, "dd/MM/yyyy") : "Pilih tanggal"}
                    <CalendarIcon className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                <DayPicker
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    if (date) {
                      console.log("Tanggal mulai dipilih:", date);
                      setField("startDate", date); // Simpan di Zustand
                      setValue("startDate", date, { shouldValidate: true }); // Simpan di react-hook-form
                    }
                  }}
                />

                </PopoverContent>
              </Popover>
              {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
            </div>

            {/* Pilih Tanggal Berakhir */}
            <div className="space-y-2">
              <Label>Pilih Tanggal Berakhir</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full flex justify-between">
                    {endDate ? format(endDate, "dd/MM/yyyy") : "Pilih tanggal"}
                    <CalendarIcon className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                <DayPicker
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => {
                    if (date) {
                      console.log("Tanggal berakhir dipilih:", date);
                      setField("endDate", date);
                      setValue("endDate", date, { shouldValidate: true });
                    }
                  }}
                />
                </PopoverContent>
              </Popover>
              {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
            </div>

            {/* Periode */}
            <SelectField 
              name="periode" 
              label="Periode" 
              options={[
                { value: "periode1", label: "Periode 1" },
                { value: "periode2", label: "Periode 2" }
              ]} 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 space-y-6">
            <h3 className="text-lg font-semibold">Dokumen Materi</h3>

            {/* Input Link */}
            <div className="space-y-2">
              <InputField
                name="linkDokumen"
                label="Input Link Dokumen Materi"
                placeholder="Masukkan link dokumen"
                type="url"
              />
            </div>

            {/* Select Tipe Materi */}
            <div className="space-y-2">
              <Label>Tipe Materi</Label>
              <Select
                onValueChange={(value) => {
                  setField("tipeMateri", value);
                  setValue("tipeMateri", value as "pdf" | "video" | "dokumen");
                }}
                defaultValue={tipeMateri}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe materi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="dokumen">Dokumen</SelectItem>
                </SelectContent>
              </Select>
              {errors.tipeMateri && (
                <p className="text-red-500 text-sm">{errors.tipeMateri.message}</p>
              )}
            </div>

            {/* Upload Thumbnail */}
            <div className="space-y-2">
              <Label>Upload Thumbnail</Label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnailChange}
                  />
                  <Card className="w-16 h-16 flex items-center justify-center border rounded-lg cursor-pointer hover:bg-gray-100">
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Upload className="w-5 h-5 text-gray-500" />
                    )}
                  </Card>
                </label>
                {thumbnail && <p className="text-sm">{thumbnail.name}</p>}
              </div>
            </div>

            {/* Input Keywords */}
            <KeywordsInput />

            <HorizontalLine />

            {/* Button Tambah Dokumen */}
            <ButtonWithIcon
              icon={isLoading ? Loader2 : Plus}
              label={isLoading ? "Mengirim..." : "Tambah Dokumen"}
              onClick={handleSubmit(onSubmit)}
              className="bg-black text-white py-2 justify-center disabled:opacity-50"
              type="submit"
            />
          </CardContent>
        </Card>

        <ConfirmDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleSubmit(onSubmit)}
          title="Konfirmasi Simpan"
          description="Apakah Anda yakin ingin menyimpan dokumen ini?"
          isLoading={isLoading}
        />

      </form>
    </FormProvider>
  );
}
