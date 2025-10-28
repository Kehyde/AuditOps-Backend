import mongoose from "mongoose";

const findingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  severity: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
  },
  auditId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Audit",
    required: true,
  },
});

export default mongoose.model("Finding", findingSchema);
