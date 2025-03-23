import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer'; // Import multer
import path from 'path';

import materiRoutes from './routes/materiRoutes.js';

dotenv.config();

const app = express();

// Konfigurasi penyimpanan Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pastikan folder uploads ada di root proyek
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Menamai file dengan timestamp
  },
});

// Setup multer dengan penyimpanan yang sudah diatur
const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());

// Gunakan middleware upload.single('thumbnail') untuk upload file di materiRoutes
app.use('/api/materi', upload.single('thumbnail'), materiRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { dbName: 'bri' })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

export default app;
