import { z } from "zod";

export const formSchema = z.object({
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

export type FormDataType = z.infer<typeof formSchema>;