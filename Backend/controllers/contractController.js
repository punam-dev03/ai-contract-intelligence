import Contract from "../models/Contract.js";
import { extractTextFromPDF } from "../services/pdfParserService.js";
import { extractClausesAI } from "../services/aiClauseService.js";
import { scoreContract } from "../services/scoringService.js";
import { simulateFinancialImpact } from "../services/simulationService.js";
import { generateSaferClause } from "../services/redlineService.js";
import { simulateNegotiation } from "../services/negotiationService.js";
import { chatWithContract } from "../services/contractChatService.js";
import { compareContractVersions } from "../services/versionCompareService.js";
import { calculateComplexity } from "../services/complexityService.js";
import fs from "fs";

export const compareVersions = async (req,res)=>{

  try{

    const {contractAId, contractBId} = req.body;

    const contractA = await Contract.findById(contractAId);
    const contractB = await Contract.findById(contractBId);

    const differences = compareContractVersions(contractA, contractB);

    res.json({
      contractA: contractA.fileName,
      contractB: contractB.fileName,
      differences
    });

  }catch(err){

    res.status(500).json({message:err.message});

  }

};

export const redlineClause = async (req, res) => {
  try {
    const { clauseText } = req.body;

    if (!clauseText) {
      return res.status(400).json({ message: "Clause text required" });
    }

    const improved = await generateSaferClause(clauseText);

    res.json({ improvedClause: improved });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// Upload Contract
// ============================

export const uploadContract = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    const text = await extractTextFromPDF(filePath);

    const aiData = await extractClausesAI(text);

    // 🔥 SAFETY CHECK
    if (!aiData || !aiData.clauses) {
      return res.status(400).json({ message: "AI did not return clauses" });
    }

    const scored = scoreContract(aiData.clauses);
    const complexityScore = calculateComplexity(scored.clauses);

    const saved = await Contract.create({
      user: req.user.id,
      fileName: req.file.originalname,
      filePath: req.file.filename,
      industry: aiData.industry || "General",
      clauses: scored.clauses, // 🔥 THIS MUST CONTAIN severity
      overallRiskScore: scored.overallRiskScore,
      overallRiskLevel: scored.overallRiskLevel,
      complexityScore: complexityScore,
      confidenceScore: aiData.confidenceScore || 70,
      executiveSummary: scored.executiveSummary,
    });

    res.status(201).json(saved);

  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// ============================
// Get My Contracts
// ============================

export const getMyContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(contracts);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============================
// Simulate Financial Impact
// ============================

export const simulateImpact = async (req, res) => {
  try {
    const { contractId, monthlyIncome, emergencySavings } = req.body;

    const contract = await Contract.findOne({
      _id: contractId,
      user: req.user.id,
    });

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    const result = simulateFinancialImpact(
      contract.clauses,
      monthlyIncome,
      emergencySavings
    );

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============================
// Delete Contract
// ============================

export const deleteContract = async (req, res) => {
  try {

    const contract = await Contract.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // ⭐ delete PDF from uploads folder
    const filePath = `uploads/${contract.filePath}`;

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: "Contract and PDF deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


// ============================
// Compare Contracts
// ============================

export const compareContracts = async (req, res) => {
  try {
    const { contractAId, contractBId } = req.body;

    const contractA = await Contract.findById(contractAId);
    const contractB = await Contract.findById(contractBId);

    if (!contractA || !contractB) {
      return res.status(404).json({ message: "Contract not found" });
    }

    const safer =
      contractA.overallRiskScore < contractB.overallRiskScore
        ? contractA.fileName
        : contractB.fileName;

    res.json({
      contractA: {
        name: contractA.fileName,
        risk: contractA.overallRiskScore,
      },
      contractB: {
        name: contractB.fileName,
        risk: contractB.overallRiskScore,
      },
      saferOption: safer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const negotiateContract = async (req, res) => {
  try {

    const { clauseText, userProposal } = req.body;

    if (!clauseText || !userProposal) {
      return res.status(400).json({ message: "Missing negotiation data" });
    }

    const result = await simulateNegotiation(clauseText, userProposal);

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const contractChat = async (req, res) => {

  try {

    const { contractId, question } = req.body;

    const contract = await Contract.findById(contractId);

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    const contractText = contract.clauses
      .map(c => c.description)
      .join("\n");

    const answer = await chatWithContract(contractText, question);

    res.json({ answer });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};