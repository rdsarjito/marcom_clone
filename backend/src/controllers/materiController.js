import Materi from "../models/Materi.js";

// Get all materi
export const getAllMateri = async (req, res) => {
  try {
    const materi = await Materi.find();
    res.json(materi);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
};

// Add new materi
export const addMateri = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    // Validasi tanggal mulai dan tanggal berakhir
    if (new Date(req.body.startDate) > new Date(req.body.endDate)) {
      return res.status(400).json({ message: "Tanggal mulai tidak boleh lebih besar dari tanggal berakhir" });
    }

    // Menyusun data materi baru
    const newMateri = new Materi({
      ...req.body, // Menyertakan linkDokumen, tipeMateri, dan keywords
      thumbnail: req.file ? req.file.path : null, // Menyimpan path file thumbnail jika ada
    });

    // Menyimpan materi baru ke database
    await newMateri.save();
    res.status(201).json(newMateri);
  } catch (error) {
    console.error("Error saat menambahkan materi:", error);
    res.status(500).json({ message: "Gagal menambahkan materi", error: error.message });
  }
};
