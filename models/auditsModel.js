import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  clientName: { type: String, required: true },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Audit", auditSchema);
