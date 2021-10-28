import {Application, NextFunction, Request, Response} from "express";
import {PasswordController} from "../controllers/passwordController";

export class PasswordRoutes {
    private passwordController: PasswordController = new PasswordController();
    // Reference used to create password reset func: http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/

    public route(app: Application) {
        app.get("/api/password-reset", (req: Request, res: Response) => {
            console.log("Hit the /api/password-reset route")
            this.passwordController.sendRecoveryMail(req, res);
        });

        app.get("/api/password-reset/:userId/:token", (req: Request, res: Response,  next: NextFunction) => {
            this.passwordController.validateToken(req, res, next, true);
        });

        app.post("/api/password-reset/:userId/:token", (req: Request, res: Response, next: NextFunction) => {
            this.passwordController.updatePassword(req, res, next);
        });
    }
}
