import mongoose from "mongoose";

const policySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  policyName: { type: String, required: true },
  policyNumber: { type: String, required: true },
  insuranceCompany: { type: String, required: true },
  policyType: { type: String, required: true },
  premiumAmount: { type: Number, required: true },
  premiumFrequency: { type: String, enum: ["monthly", "yearly"], required: true },
  coverageAmount: { type: Number, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  notes: { type: String },
  documents: [{ type: String }] // file paths
}, { timestamps: true });

export default mongoose.model("Policy", policySchema);
