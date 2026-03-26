import express from "express";
import { upload } from "../middlewares/uploadMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import { redlineClause } from "../controllers/contractController.js";
import { contractChat } from "../controllers/contractController.js";



import {
  uploadContract,
  simulateImpact,
  getMyContracts,
  deleteContract,
  compareContracts,
  negotiateContract,
} from "../controllers/contractController.js";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadContract);

router.post("/simulate", protect, simulateImpact);

router.get("/my", protect, getMyContracts);

router.delete("/:id", protect, deleteContract);

router.post("/compare", protect, compareContracts);

router.post("/redline", protect, redlineClause);

router.post("/negotiate", protect, negotiateContract);

router.post("/chat", protect, contractChat);

export default router;