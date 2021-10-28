import {Request, Response} from "express";
import crypto from "crypto";
import {
    insufficientParameters,
    mongoError,
    successResponse,
} from "../modules/common/service";
import {sendEmail} from "../utils/sendEmail";
import UserService from "../modules/user/service";

export class PasswordController {
    private userService: UserService = new UserService();

    private isExpired(expirationDate: Date){
        const currentDate = new Date();
        console.log("currentDate", currentDate)
        console.log("expirationDate", expirationDate)
        console.log("isExpired", currentDate >= expirationDate)
        return currentDate >= expirationDate
    }

    public sendRecoveryMail(req: Request, res: Response){
        // Check if user exists for the given email
        const email = req.query.email as string;
        if(!email){
            return insufficientParameters(res, "No email provided")
        }

        this.userService.findByEmail(email, (err, user) => {
            if (err) return mongoError(err, res);
            if (user) {
                // Check if token already exists - return a message
                console.log("user", user)
                if(user.resetPasswordToken){
                    console.log("this", this)

                    if(!this.isExpired(user.resetPasswordExpires)){
                        const message = `We were already making a new password, please check your mail.`
                        return successResponse(message, { error: true, message: message }, res)
                    }
                }

                // Set the resetPasswordToken && resetPasswordExpires to 30m
                crypto.randomBytes(32, (err, buffer) => {
                    if (err) return mongoError(err, res);
                    const token = buffer.toString('hex');
                    const diff = 30 // difference in minutes

                    const userUpdated = user;
                    userUpdated.resetPasswordToken = token;
                    userUpdated.resetPasswordExpires = new Date(new Date().getTime() + diff * 60000);

                    this.userService.updateUser(userUpdated, (err, userDocument) => {
                        if(err) return mongoError(err, res);

                        // Send email with link containing the url with userId + token
                        const html = `Please confirm to reset your password - click on the following link: <a href="http://localhost:3000/password-reset/${userUpdated._id}/${token}">http://localhost:3000/password-reset</a>`;
                        const plainText = `Please confirm to reset your password - go to the following link: http://localhost:3000/password-reset/${userUpdated._id}/${token}`;
                        const mail = { email, subject: "Reset your password - GG Service desk", html, text: plainText }

                        sendEmail(mail.email, mail.subject, mail.html,  mail.text, res);
                    })
                })
            }else{
                const message = `User with email ${email} not found.`;
                return successResponse(message, { error: true }, res)
            }
        });
    }

    public validateToken(req: Request, res: Response, next, final = false){
        const token = req.query.token as string;
        const userId = req.query.userId as string;

        if(!userId || !token){
            return insufficientParameters(res, "No valid token or userId provided")
        }

        // Check validity of token and user
        // check if it finds the user when only one of the two values provided is correct
        this.userService.getUser({_id: req.query.userId}, (err, user) => {
            if (err) return mongoError(err, res);

            if(user.resetPasswordToken){
                if(this.isExpired(user.resetPasswordExpires)){
                    const message = `The token password reset token is expired, please try again.`

                    const userUpdated = user;
                    userUpdated._doc.resetPasswordExpires = null;
                    userUpdated._doc.resetPasswordToken = "";

                    this.userService.updateUser(userUpdated, (err) => {
                        userUpdated.save();

                        if (err) return mongoError(err, res);
                        return successResponse(message, { error: true, message }, res)
                    })
                }else{
                    // Send signal back to client that it should display the password forget UI.
                    const message = "Token and user is valid.";
                    if(final){
                        return successResponse(message, { error: false, message }, res)
                    }else{
                        return;
                    }
                }
            }else{
                const message = "Token does not exist for the given user.";
                return successResponse(message, { error: true, message }, res)
            }
        })
    }

    public updatePassword(req: Request, res: Response, next){
        const userId = req.query.userId as string;
        const token = req.query.token as string;
        const password = req.body.password;

        if(!userId || !token || !password){
            const message = "No valid token, userId or password provided";
            return insufficientParameters(res, message)
        }

        // Check validity of token and user
        this.validateToken(req, res, next);

        // Update user with new password credentials
        this.userService.getUser({resetPasswordToken: req.query.token, _id: req.query.userId}, (err, user) => {
            if (err) return mongoError(err, res);

            // Unset passwordResetToken and passwordResetExpires & change password
            const userUpdated = user;
            userUpdated._doc.resetPasswordExpires = null;
            userUpdated._doc.resetPasswordToken = "";
            userUpdated._doc.password = password;

            this.userService.updateUserWithPreSave(userUpdated, (err: any) => {
                if (err) return mongoError(err, res);

                const message = "Password succesfully updated"
                return successResponse(message, { error: false, message }, res)
            });
        });
    }
}
