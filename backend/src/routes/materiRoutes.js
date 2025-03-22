import express from "express";
import { getAllMateri, addMateri, deleteMateri } from "../controllers/materiController.js";

const router = express.Router();

router.get("/", getAllMateri);
router.post("/", addMateri);
router.delete("/:id", deleteMateri);

export default router;