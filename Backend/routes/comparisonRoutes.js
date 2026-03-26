import express from "express";
import { compareTwoContracts } from "../controllers/comparisonController.js";

const router = express.Router();

router.post("/compare", compareTwoContracts);

export default router;