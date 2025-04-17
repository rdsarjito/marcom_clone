// lib/validation.ts
import { z } from "zod";

export const formSchema = z.object({
  brand: z.string(),
  cluster: z.string(),
  fitur: z.string(),
  namaMateri: z.string(),
  jenis: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  dokumenMateri: z.array(
    z.object({
      linkDokumen: z.string().url({ message: "Link tidak valid" }),
      tipeMateri: z.string(),
      thumbnail: z.any(), // bisa ditambahkan validasi file jika perlu
      keywords: z.array(z.string().min(1)).min(1),
    })
  ),
});

export type FormDataType = z.infer<typeof formSchema>;
