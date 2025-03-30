import mongoose from "mongoose";

const MateriSchema = new mongoose.Schema({
  brand: { type: String, required: false },
  cluster: { type: String, required: false },
  fitur: { type: String, required: false },
  namaMateri: { type: String, required: false },
  jenis: { type: String, required: false },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  thumbnail: { type: String, required: false }, // File path thumbnail
  linkDokumen: { type: String, required: false }, // Link dokumen
  tipeMateri: { type: String, required: false }, // Tipe materi (misalnya pdf)
  keywords: { type: [String], required: false } // Array of keywords
}, { timestamps: true });

export default mongoose.model("Materies", MateriSchema);