import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useMateriStore from "@/store/useMateriStore";

import { useToast } from "@/hooks/use-toast";
import { formSchema, FormDataType } from "@/lib/validation";
import { CheckCircle } from "lucide-react";

export function useDocumentForm() {
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
  
      const newData = await response.json(); // asumsinya backend return data baru
      useMateriStore.getState().setHighlightedId(newData._id); // set highlight
  
      // hilangkan highlight setelah 3 detik
      setTimeout(() => {
        useMateriStore.getState().setHighlightedId(null);
      }, 3000);
  
      // toast + redirect
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
  
      reset();
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast({
        title: "Gagal menyimpan",
        description: "Terjadi kesalahan, coba lagi nanti.",
        className: "bg-red-100 text-red-800",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    methods,
    handleSubmit,
    isLoading,
    isDialogOpen,
    setIsDialogOpen,
    onSubmit,
  };
}
