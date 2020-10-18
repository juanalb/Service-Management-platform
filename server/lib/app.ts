import express from "express";
import bodyParser from "body-parser";
import { TestRoutes } from "./routes/test_routes";
import { CommonRoutes } from "./routes/common_routes";
import mongoose from "mongoose";
import {UserRoutes} from "./routes/userRoutes";
require('dotenv').config()

class App {
  public app: express.Application;
  private test_routes: TestRoutes = new TestRoutes();
  private common_routes: CommonRoutes = new CommonRoutes();
  private userRoutes: UserRoutes = new UserRoutes();
  private mongoUrl: string = process.env.MONGO_CONNECTION_STRING
  private dotenv;

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.test_routes.route(this.app);
    this.userRoutes.route(this.app);
    this.common_routes.route(this.app);
  }
  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
  }
}

export default new App().app;
