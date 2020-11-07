import mongoose, { Schema } from "mongoose";

export const IncidentSchema = new mongoose.Schema({
  reportDate: Date,
  subject: String,
  type: {
    type: String,
    enum: ["Software", "Hardware", "Service"],
    default: "Software"
  },
  reportedBy: { type: Schema.Types.ObjectId, ref: "User" },
  priority: { type: String, enum: ["Low", "Normal", "High"], default: "Low" },
  deadline: Date,
  description: String,
  isResolved: Boolean
});

IncidentSchema.set("toJSON", {
  virtuals: true
});

export default mongoose.model("Incidents", IncidentSchema);
