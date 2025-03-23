"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
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
import HorizontalLine from "./uiRama/horizontalLine";
import useFormStore from "../store/useFormStore";
import { useToast } from "@/hooks/use-toast"


import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";

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
  const { toast } = useToast()

  const { startDate, endDate,cluster, fitur, namaMateri, jenis, periode, linkDokumen, tipeMateri, keywords, setField, addKeyword } =
    useFormStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: { startDate, endDate, linkDokumen, tipeMateri, keywords, thumbnail: undefined },
  });

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
    if (!formData) return;
    setIsLoading(true);
    setIsDialogOpen(false);

    try {
      const formData = new FormData();
      formData.append("brand", data.brand);
      formData.append("cluster", data.cluster);
      formData.append("fitur", data.fitur);
      formData.append("namaMateri", data.namaMateri);
      formData.append("jenis", data.jenis);
      formData.append("startDate", data.startDate?.toISOString() || "");
      formData.append("endDate", data.endDate?.toISOString() || "");
      formData.append("periode", data.periode);

      formData.append("linkDokumen", data.linkDokumen);
      formData.append("tipeMateri", data.tipeMateri);
      data.keywords.forEach((kw, index) => formData.append(`keywords[${index}]`, kw));
      if (thumbnail) formData.append("thumbnail", thumbnail); // Upload file jika ada

      console.log(formData);
      const response = await fetch("http://localhost:5000/api/materi", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Gagal mengirim data");

      toast({
        description: (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-green-800 font-semibold">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Data berhasil disimpan</span>
            </div>
            <span className="text-green-800">Materi komunikasi berhasil tersimpan</span>
          </div>
        ),
        className: "bg-green-100 border border-green-300 shadow-md rounded-lg",
      });

      setThumbnail(null);
      setPreview(null);
      reset(); 
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Gagal menyimpan",
        description: (
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <span>Terjadi kesalahan, coba lagi nanti.</span>
          </div>
        ),
        className: "bg-red-100 text-red-800 border border-red-400",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit((data) => { setFormData(data); setIsDialogOpen(true); })} className="max-w-2xl mx-auto p-6">
      <Card className="mb-2">
        <CardContent className="p-6 space-y-6">
          <h3 className="text-lg font-semibold">Informasi Umum</h3>

          {/* Brand */}
          <div className="space-y-2">
            <Label>Brand</Label>
            <Select onValueChange={(value) => setValue("brand", value, { shouldValidate: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brand1">Brand 1</SelectItem>
                <SelectItem value="brand2">Brand 2</SelectItem>
              </SelectContent>
            </Select>
            {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
          </div>

          {/* Cluster */}
          <div className="space-y-2">
            <Label>Cluster</Label>
            <Select onValueChange={(value) => setValue("cluster", value, { shouldValidate: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Cluster" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cluster1">Cluster 1</SelectItem>
                <SelectItem value="cluster2">Cluster 2</SelectItem>
              </SelectContent>
            </Select>
            {errors.cluster && <p className="text-red-500">{errors.cluster.message}</p>}
          </div>

          {/* Fitur */}
          <div className="space-y-2">
            <Label>Fitur</Label>
            <Select onValueChange={(value) => setValue("fitur", value, { shouldValidate: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Fitur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fitur1">Fitur 1</SelectItem>
                <SelectItem value="fitur2">Fitur 2</SelectItem>
              </SelectContent>
            </Select>
            {errors.fitur && <p className="text-red-500">{errors.fitur.message}</p>}
          </div>

          {/* Nama Materi */}
          <div className="space-y-2">
            <Label>Nama Materi</Label>
            <Input placeholder="Masukkan nama materi" {...register("namaMateri")} />
            {errors.namaMateri && <p className="text-red-500">{errors.namaMateri.message}</p>}
          </div>

          {/* Jenis */}
          <div className="space-y-2">
            <Label>Jenis</Label>
            <Select onValueChange={(value) => setValue("jenis", value, { shouldValidate: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis materi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jenis1">Jenis 1</SelectItem>
                <SelectItem value="jenis2">Jenis 2</SelectItem>
              </SelectContent>
            </Select>
            {errors.jenis && <p className="text-red-500">{errors.jenis.message}</p>}
          </div>

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
          <div className="space-y-2">
            <Label>Periode</Label>
            <Select onValueChange={(value) => setValue("periode", value, { shouldValidate: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="periode1">Periode 1</SelectItem>
                <SelectItem value="periode2">Periode 2</SelectItem>
              </SelectContent>
            </Select>
            {errors.periode && <p className="text-red-500">{errors.periode.message}</p>}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 space-y-6">
          <h3 className="text-lg font-semibold">Dokumen Materi</h3>

          {/* Input Link */}
          <div className="space-y-2">
            <Label>Input Link Dokumen Materi</Label>
            <Input
              type="text"
              placeholder="Masukkan link dokumen"
              {...register("linkDokumen")}
              onChange={(e) => setField("linkDokumen", e.target.value)}
            />
            {errors.linkDokumen && (
              <p className="text-red-500 text-sm">{errors.linkDokumen.message}</p>
            )}
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
          <div className="space-y-4">
            {keywords.map((keyword, index) => (
              <div key={index} className="space-y-2">
                <Label>Input Keyword {index + 1}</Label>
                <Input
                  type="text"
                  placeholder="Masukkan keyword"
                  {...register(`keywords.${index}`)}
                  onChange={(e) => {
                    const newKeywords = [...keywords];
                    newKeywords[index] = e.target.value;
                    setField("keywords", newKeywords);
                  }}
                />
                {errors.keywords?.[index] && (
                  <p className="text-red-500 text-sm">
                    {errors.keywords[index]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Button Tambah Keyword */}
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={addKeyword}
            type="button"
          >
            <Plus className="w-4 h-4" />
            Tambah Keyword
          </Button>

          <HorizontalLine />

          {/* Button Tambah Dokumen */}
          <Button
            className="bg-black text-white py-2 flex items-center justify-center gap-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            {isLoading ? "Mengirim..." : "Tambah Dokumen"}
          </Button>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Konfirmasi Simpan</DialogTitle>
          <p>Apakah Anda yakin ingin menyimpan dokumen ini?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
              Ya, Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
