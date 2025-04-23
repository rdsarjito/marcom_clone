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

    // Membuat materi baru dan menyertakan periode
    const newMateri = new Materi({
      brand: req.body.brand,
      cluster: req.body.cluster,
      fitur: req.body.fitur,
      namaMateri: req.body.namaMateri,
      jenis: req.body.jenis,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      periode: req.body.periode,
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


export const updateMateri = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Update req body:", req.body);
    console.log("Update uploaded files:", req.files);

    // Validasi tanggal
    if (new Date(req.body.startDate) > new Date(req.body.endDate)) {
      return res.status(400).json({
        message: "Tanggal mulai tidak boleh lebih besar dari tanggal berakhir",
      });
    }

    const dokumenMateri = [];
    let index = 0;

    while (req.body[`dokumenMateri[${index}].linkDokumen`] !== undefined) {
      const keywords = Object.entries(req.body)
        .filter(([key]) => key.startsWith(`dokumenMateri[${index}].keywords[`))
        .map(([_, val]) => val);

      // Cek jika ada file thumbnail baru, jika tidak, gunakan yang lama
      const thumbnailFile = req.files.find(
        (f) => f.fieldname === `dokumenMateri[${index}].thumbnail`
      );

      dokumenMateri.push({
        linkDokumen: req.body[`dokumenMateri[${index}].linkDokumen`],
        tipeMateri: req.body[`dokumenMateri[${index}].tipeMateri`],
        keywords,
        // Jika ada file thumbnail baru, pakai itu, jika tidak gunakan thumbnail lama dari database
        thumbnail: thumbnailFile ? thumbnailFile.path : req.body[`dokumenMateri[${index}].thumbnail`] || null,
      });

      index++;
    }

    const updatedMateri = await Materi.findByIdAndUpdate(
      id,
      {
        brand: req.body.brand,
        cluster: req.body.cluster,
        fitur: req.body.fitur,
        namaMateri: req.body.namaMateri,
        jenis: req.body.jenis,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        periode: req.body.periode,
        dokumenMateri,
      },
      { new: true }
    );

    if (!updatedMateri) {
      return res.status(404).json({ message: "Materi tidak ditemukan" });
    }

    res.json(updatedMateri);
  } catch (error) {
    console.error("Error saat mengupdate materi:", error);
    res.status(500).json({
      message: "Gagal mengupdate materi",
      error: error.message,
    });
  }
};
