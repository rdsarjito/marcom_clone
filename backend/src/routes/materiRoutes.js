import express from 'express';
import { getAllMateri, addMateri } from '../controllers/materiController.js';

const router = express.Router();

router.get("/", getAllMateri);
router.post("/", addMateri); // multer middleware dipindah ke app.js (upload.any)

export default router;
