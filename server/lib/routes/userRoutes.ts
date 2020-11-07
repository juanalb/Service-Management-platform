import { Application, Request, Response } from "express";
import { UserController } from "../controllers/userController";

export class UserRoutes {
  private userController: UserController = new UserController();

  public route(app: Application) {
    app.post("/api/user", (req: Request, res: Response) => {
      this.userController.create(req, res);
    });

    app.get("/api/user/all", (req: Request, res: Response) => {
      this.userController.getAll(req, res);
    });

    app.get("/api/user/:id", (req: Request, res: Response) => {
      this.userController.getById(req, res);
    });

    app.put("/api/user/:id", (req: Request, res: Response) => {
      this.userController.update(req, res);
    });

    app.delete("/api/user/:id", (req: Request, res: Response) => {
      this.userController.delete(req, res);
    });
  }
}
