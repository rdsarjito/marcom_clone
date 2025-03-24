"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { formSchema, FormDataType } from "@/lib/validation";

import HorizontalLine from "../uiRama/horizontalLine";
import SelectField from "../uiRama/selectField";
import ConfirmDialog from "../uiRama/confirmDialog";
import ButtonWithIcon from "../uiRama/buttonWithIcon";
import InputField from "../uiRama/inputField";
import { KeywordsInput } from "./component/keywordInput";
import UploadThumbnail from "./component/uploadThumbnail";
import DatePickerForm from "./component/datePickerForm";

export default function DocumentForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const methods = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      linkDokumen: "",
      tipeMateri: undefined,
      keywords: [],
      thumbnail: undefined,
    },
  });
  
  const { handleSubmit, reset } = methods;
  
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
      <form onSubmit={handleSubmit(() => setIsDialogOpen(true))} className="max-w-2xl mx-auto p-6">        <Card className="mb-2">
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
            <DatePickerForm name="startDate" label="Pilih Tanggal Mulai" />

            {/* Pilih Tanggal Berakhir */}
            <DatePickerForm name="endDate" label="Pilih Tanggal Berakhir" />

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
            <InputField
              name="linkDokumen"
              label="Input Link Dokumen Materi"
              placeholder="Masukkan link dokumen"
              type="url"
            />

            {/* Select Tipe Materi */}
            <SelectField 
              name="tipeMateri" 
              label="Tipe Materi" 
              options={[
                { value: "pdf", label: "PDF" },
                { value: "video", label: "Video" },
                { value: "dokumen", label: "Dokumen" }
              ]} 
            />

            {/* Upload Thumbnail */}
            <UploadThumbnail name="thumbnail" />

            {/* Input Keywords */}
            <KeywordsInput />

            <HorizontalLine />

            {/* Button Tambah Dokumen */}
            <ButtonWithIcon
              icon={isLoading ? Loader2 : Plus}
              label={isLoading ? "Mengirim..." : "Tambah Dokumen"}
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