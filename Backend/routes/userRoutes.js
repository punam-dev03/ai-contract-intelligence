import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { updatePassword } from "../controllers/userController.js";

import { getMyProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protect, getMyProfile);

router.put("/change-password", protect, updatePassword);

export default router;