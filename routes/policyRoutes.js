import express from "express";
import { addPolicy, getPolicies, getDashboard } from "../controllers/policyController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addPolicy);
router.get("/", protect, getPolicies);
router.get("/dashboard", protect, getDashboard);

export default router;
