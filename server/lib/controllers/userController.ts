import {Request, Response} from "express";
import {
    insufficientParameters,
    mongoError,
    successResponse,
    failureResponse
} from "../modules/common/service";
import {IUser, IUserDocument} from "../modules/user/model";
import UserService from "../modules/user/service";
import {response_status_codes} from "../modules/common/model";

export class UserController {
    private userService: UserService = new UserService();

    public create(req: Request, res: Response) {
        if (
            req.body.role &&
            req.body.firstName &&
            req.body.lastName &&
            req.body.phoneNumber &&
            req.body.email &&
            req.body.password &&
            req.body.building
        ) {
            const user_params: IUser = {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                building: req.body.building,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                role: req.body.role
            };

            this.userService.findByEmail(user_params.email, (err: any, user: IUser) => {
                if(user){
                    return mongoError(err, res, "User with email already exists");
                }

                this.userService.createUser(user_params, (err: any, user_data: IUser) => {
                    if (err) {
                        mongoError(err, res);
                    } else {
                        successResponse("create user successful", user_data, res);
                    }
                });
            })
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    //TODO: implement sign-up call, for now use the creat call
    public signUp(req: Request, res: Response) {
        if (req) {
            this.userService.getAllUsers(null, (err: any, users: IUser[]) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse("get users successfull", users, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public getAll(req: Request, res: Response) {
        if (req) {
            this.userService.getAllUsers(null, (err: any, users: IUser[]) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse("get users successfull", users, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public login(req: Request, res: Response) {
        const token = req.cookies.token;
        const rememberUser = req.body.rememberUser;

        this.userService.findByToken(token, (err, user) => {
            if (err) return mongoError(err, res);
            if (user) {
                return res.json({
                    isAuth: false,
                    message: "You are already logged in",
                    token: user.token,
                    role: user.role,
                    userId: user._id,
                });
            } else {
                this.userService.getUser({email: req.body.email}, function (
                    err,
                    user: IUserDocument
                ) {
                    if (!user) return res.status(404).send({isAuth: false, message: "Incorrect e-mail or password"}); //email incorrect
                    user.comparePassword(req.body.password, (err, isMatch) => {
                        if (!isMatch){
                            return res.status(404).send({
                                isAuth: false,
                                message: "Incorrect e-mail or password" //password incorrect
                            });
                        }

                        user.generateToken((err, user) => {
                            if (err) return res.status(404).send({
                                isAuth: false,
                                message: "Failed to generate a token, contact your system administrator"
                            });

                            console.log("Setting token as cookie....", user.token)
                            res.status(200)
                                .cookie('token', user.token,
                                {
                                    sameSite: 'strict',
                                    httpOnly: true,
                                    secure: process.env.NODE_ENV !== "development",
                                    expires: rememberUser ? new Date(new Date().getTime() + 3600 * 1000) : null
                                }).send({
                                    isAuth: true,
                                    userId: user._id,
                                    role: user.role,
                                    message: `Login successful, welcome ${user.firstName} ${user.lastName}`,
                                    token: user.token
                            });
                        });
                    });
                });
            }
        });
    }

    public logout(req: Request, res: Response) {
        const token = req.cookies.token;
        console.log("token in logout function", token)

        this.userService.findByToken(token, (err, user) => {
            if (err) return mongoError(err, res);
            if (user)
                user.deleteToken(token, (err) => {
                    if (err) return mongoError(err, res);
                    res.status(200).clearCookie('token').send("user logged out and cookie cleared")
                });
            else {
                return mongoError(err, res);
            }
        });
    }

    public getByFilter(req: Request, res: Response) {
        if (req.query.email && req.query.password) {
            const filter = {
                email: req.query.email.toString(),
                password: req.query.password.toString()
            };
            this.userService.getUser(
                {email: filter.email},
                (err: any, user: IUserDocument) => {
                    user.comparePassword(
                        filter.password,
                        (err: any, isMatch: boolean) => {
                            if (err) {
                                mongoError(err, res);
                            } else {
                                isMatch
                                    ? successResponse("user login successfull", user, res)
                                    : res.status(response_status_codes.bad_request).json({
                                        STATUS: "FAILURE",
                                        MESSAGE: "Incorrect password",
                                        data: {}
                                    });
                            }
                        }
                    );
                }
            );
        } else {
            insufficientParameters(res);
        }
    }

    public getById(req: Request, res: Response) {
        if (req.params.id) {
            const user_filter = {_id: req.params.id};
            this.userService.getUser(user_filter, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse("get user successfull", user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public update(req: Request, res: Response) {
        if (
            (req.params.id && req.body.name) ||
            req.body.role ||
            req.body.firstName ||
            req.body.lastName ||
            req.body.phoneNumber ||
            req.body.email ||
            req.body.password ||
            req.body.building
        ) {
            const user_filter = {_id: req.params.id};
            this.userService.getUser(user_filter, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else if (user_data) {
                    const user_params: IUser = {
                        _id: user_filter._id,
                        email: req.body.email ? req.body.email : user_data.email,
                        firstName: req.body.firstName
                            ? req.body.firstName
                            : user_data.firstName,
                        lastName: req.body.lastName
                            ? req.body.lastName
                            : user_data.lastName,
                        building: req.body.building
                            ? req.body.building
                            : user_data.building,
                        password: req.body.phoneNumber
                            ? req.body.phoneNumber
                            : user_data.phoneNumber,
                        phoneNumber: req.body.password
                            ? req.body.password
                            : user_data.password,
                        role: req.body.role ? req.body.role : user_data.role,
                        token: req.body.token,
                        resetPasswordToken: req.body.resetPasswordToken ? req.body.resetPasswordToken : user_data.resetPasswordToken,
                        resetPasswordExpires: req.body.resetPasswordExpires ? req.body.resetPasswordExpires : user_data.resetPasswordExpires
                    };
                    // This might be broken,
                    this.userService.updateUser(user_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse("update user successfull", user_params, res);
                        }
                    });
                } else {
                    failureResponse("invalid user", null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete(req: Request, res: Response) {
        if (req.params.id) {
            this.userService.deleteUser(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse("delete user successful", null, res);
                } else {
                    failureResponse("invalid user", null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}
