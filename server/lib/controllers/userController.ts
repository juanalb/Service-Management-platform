import { Request, Response } from "express";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse
} from "../modules/common/service";
import { IUser } from "../modules/user/model";
import UserService from "../modules/user/service";

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
      req.body.location
    ) {
      const user_params: IUser = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        location: req.body.location,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role
      };
      this.userService.createUser(user_params, (err: any, user_data: IUser) => {
        if (err) {
          mongoError(err, res);
        } else {
          successResponse("create user successfull", user_data, res);
        }
      });
    } else {
      // error response if some fields are missing in request body
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

  public getById(req: Request, res: Response) {
    if (req.params.id) {
      const user_filter = { _id: req.params.id };
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
        req.body.location
    ) {
      const user_filter = { _id: req.params.id };
      this.userService.getUser(user_filter, (err: any, user_data: IUser) => {
        if (err) {
          mongoError(err, res);
        } else if (user_data) {
          const user_params: IUser = {
              _id: user_filter._id,
              email: req.body.email ? req.body.email : user_data.email,
              firstName: req.body.firstName ? req.body.firstName : user_data.firstName,
              lastName: req.body.lastName ? req.body.lastName : user_data.lastName,
              location: req.body.location ? req.body.location : user_data.location,
              password: req.body.phoneNumber ? req.body.phoneNumber : user_data.phoneNumber,
              phoneNumber: req.body.password ? req.body.password : user_data.password,
              role: req.body.role ? req.body.role : user_data.role
          };
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
