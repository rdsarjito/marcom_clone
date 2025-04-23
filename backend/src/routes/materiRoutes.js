import express from 'express';
import { getAllMateri, addMateri, updateMateri } from '../controllers/materiController.js';

const router = express.Router();

router.get("/", getAllMateri);
router.post("/", addMateri);
router.put("/:id", updateMateri); // <== Tambahkan ini

export default router;
