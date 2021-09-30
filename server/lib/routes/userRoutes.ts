import { Application, Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { auth } from "../auth/auth";
import {response_status_codes} from "../modules/common/model";

export class UserRoutes {
  private userController: UserController = new UserController();

  public route(app: Application) {
    app.post("/api/user/login", (req: Request, res: Response) => {
      this.userController.login(req, res);
    });

    app.post("/api/user/logout", auth, (req: Request, res: Response) => {
      this.userController.logout(req, res);
    });

    app.post("/api/user", auth, (req: Request, res: Response) => {
      this.userController.create(req, res);
    });

    app.post("/api/user/auth", auth, (req: Request, res: Response) => {
      res.status(200).send({
        isAuth: true,
        userId: req["user"]._id,
        message: "authorized",
        status: response_status_codes.success
      })
    });

    app.get("/api/user/all", auth, (req: Request, res: Response) => {
      this.userController.getAll(req, res);
    });

    app.get("/api/user/:id", auth, (req: Request, res: Response) => {
      this.userController.getById(req, res);
    });

    app.put("/api/user/:id", auth,(req: Request, res: Response) => {
      this.userController.update(req, res);
    });

    app.delete("/api/user/:id", auth,(req: Request, res: Response) => {
      this.userController.delete(req, res);
    });
  }
}
