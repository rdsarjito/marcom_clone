import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import materiRoutes from './routes/materiRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Gunakan .any() agar bisa upload banyak file dengan nama dinamis
app.use('/api/materi', upload.any(), materiRoutes);

app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, { dbName: 'bri' })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

export default app;
