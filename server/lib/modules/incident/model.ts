import mongoose from "mongoose";
import {IUser} from "../user/model";

export interface IIncident {
  _id?: String;
  reportDate: Date;
  subject: String;
  type: "Software" | "Hardware" | "Service";
  reportedBy: mongoose.Schema.Types.ObjectId | IUser;
  priority: "Low" | "Normal" | "High";
  deadline: Date;
  description: String;
  isResolved: Boolean;
}

export interface IncidentResponse {
  _id?: String;
  reportDate: Date;
  subject: String;
  type: "Software" | "Hardware" | "Service";
  reportedBy: IUser;
  priority: "Low" | "Normal" | "High";
  deadline: Date;
  description: String;
  isResolved: Boolean;
}
