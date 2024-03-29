import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import cors from "cors";
import * as path from "path";
import helmet from 'helmet';
import { UserRoutes } from "./routes/userRoutes";
import { IncidentRoutes } from "./routes/incidentRoutes";
import { CommonRoutes } from "./routes/commonRoutes";
import { PasswordRoutes } from "./routes/passwordRoutes";

require("dotenv").config();

class App {
  public app: express.Application;
  private commonRoutes: CommonRoutes = new CommonRoutes();
  private userRoutes: UserRoutes = new UserRoutes();
  private incidentRoutes: IncidentRoutes = new IncidentRoutes();
  private passwordRoutes: PasswordRoutes = new PasswordRoutes();
  private mongoUrl: string = process.env.MONGO_CONNECTION_STRING;

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.userRoutes.route(this.app);
    this.incidentRoutes.route(this.app);
    this.passwordRoutes.route(this.app);

    // Keep this route as last
    this.commonRoutes.route(this.app);
  }

  private config(): void {
    const buildPath = path.join(__dirname, "../build", "index.html");
    this.app.use(express.static(buildPath));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));
    this.app.use(helmet());
    this.app.use(cookieParser());
  }

  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  }
}

export default new App().app;
