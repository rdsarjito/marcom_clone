"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Schema validasi menggunakan Zod
const formSchema = z.object({
  brand: z.string().min(1, "Brand harus dipilih"),
  cluster: z.string().min(1, "Cluster harus dipilih"),
  fitur: z.string().min(1, "Fitur harus dipilih"),
  namaMateri: z.string().min(1, "Nama materi harus diisi"),
  jenis: z.string().min(1, "Jenis harus dipilih"),
  startDate: z.date({ required_error: "Tanggal mulai harus dipilih" }),
  endDate: z.date({ required_error: "Tanggal berakhir harus dipilih" }),
  periode: z.string().min(1, "Periode harus dipilih"),
});

export default function TambahMateriForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // Memastikan nilai form tersimpan dengan watch
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const onSubmit = async (data: any) => {
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch("http://localhost:5000/api/materi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Gagal mengirim data");
      }
  
      const result = await response.json();
      console.log("Sukses:", result);
    } catch (error) {
      setError("Terjadi kesalahan, coba lagi.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
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
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => date && setValue("startDate", date, { shouldValidate: true })}
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
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => date && setValue("endDate", date, { shouldValidate: true })}
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

          {/* Tombol Submit */}
          {loading && <p className="text-blue-500">Mengirim data...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <Button className="w-full mt-4" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
