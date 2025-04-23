import mongoose from "mongoose";

const MateriSchema = new mongoose.Schema({
  brand: { type: String },
  cluster: { type: String },
  fitur: { type: String },
  namaMateri: { type: String },
  jenis: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  periode: { type: String },
  dokumenMateri: [
    {
      linkDokumen: { type: String },
      tipeMateri: { type: String },
      keywords: [String],
      thumbnail: { type: String }, // path ke file
    },
  ],
}, { timestamps: true });

export default mongoose.model("Materies", MateriSchema);
