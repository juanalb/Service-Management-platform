import mongoose from "mongoose";

export interface IIncident {
  _id?: String;
  reportDate: Date;
  subject: String;
  type: "Software" | "Hardware" | "Service";
  reportedBy: mongoose.Schema.Types.ObjectId;
  priority: "Low" | "Normal" | "High";
  deadline: Date;
  description: String;
  isResolved: Boolean;
}
