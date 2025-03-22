import mongoose from "mongoose";

const MateriSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  cluster: { type: String, required: true },
  fitur: { type: String, required: true },
  namaMateri: { type: String, required: true },
  jenis: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  periode: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Materies", MateriSchema);