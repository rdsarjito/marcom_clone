import express from 'express';
import { getAllMateri, addMateri } from '../controllers/materiController.js';

const router = express.Router();

// POST route untuk menambah materi
router.get("/", getAllMateri);
router.post('/', addMateri);

export default router;