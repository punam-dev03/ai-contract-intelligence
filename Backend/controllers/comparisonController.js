import Contract from "../models/Contract.js";
import { compareContracts } from "../services/comparisonService.js";
import mongoose from "mongoose";

export const compareTwoContracts = async (req, res) => {
  try {
    const { contractIdA, contractIdB } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(contractIdA) ||
      !mongoose.Types.ObjectId.isValid(contractIdB)
    ) {
      return res.status(400).json({ message: "Invalid Contract IDs" });
    }

    const contractA = await Contract.findById(contractIdA);
    const contractB = await Contract.findById(contractIdB);

    if (!contractA || !contractB) {
      return res.status(404).json({ message: "One or both contracts not found" });
    }

    const result = compareContracts(contractA, contractB);

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};