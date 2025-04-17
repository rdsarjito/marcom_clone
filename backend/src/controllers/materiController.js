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
    console.log("Uploaded files:", req.files);

    if (new Date(req.body.startDate) > new Date(req.body.endDate)) {
      return res.status(400).json({
        message: "Tanggal mulai tidak boleh lebih besar dari tanggal berakhir",
      });
    }

    const dokumenMateri = [];
    let index = 0;

    while (req.body[`dokumenMateri[${index}].linkDokumen`] !== undefined) {
      const keywords = Object.entries(req.body)
        .filter(([key]) =>
          key.startsWith(`dokumenMateri[${index}].keywords[`)
        )
        .map(([_, val]) => val);

      const thumbnailFile = req.files.find(
        (f) => f.fieldname === `dokumenMateri[${index}].thumbnail`
      );

      dokumenMateri.push({
        linkDokumen: req.body[`dokumenMateri[${index}].linkDokumen`],
        tipeMateri: req.body[`dokumenMateri[${index}].tipeMateri`],
        keywords,
        thumbnail: thumbnailFile ? thumbnailFile.path : null,
      });

      index++;
    }

    const newMateri = new Materi({
      brand: req.body.brand,
      cluster: req.body.cluster,
      fitur: req.body.fitur,
      namaMateri: req.body.namaMateri,
      jenis: req.body.jenis,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      dokumenMateri,
    });

    await newMateri.save();
    res.status(201).json(newMateri);
  } catch (error) {
    console.error("Error saat menambahkan materi:", error);
    res.status(500).json({
      message: "Gagal menambahkan materi",
      error: error.message,
    });
  }
};
