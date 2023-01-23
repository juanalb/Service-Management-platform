import { Role } from "./enums";
import { Building } from "./enums";

export interface IUser {
  _id?: string;
  role: Role;
  firstName: string;
  lastName: string;
  fullName?: string,
  phoneNumber: string;
  email: string;
  password: string;
  building: Building;
  token?: string;
  resetPasswordToken?: string,
  resetPasswordExpires?: Date
}

export interface IUserDocument extends IUser, Document{
  comparePassword(candidatePassword: string, callback: (error: any, isMatch: boolean) => void): void;
  generateToken(callback: (error: any, user: IUser) => void): void;
  deleteToken(token: string, callback: (error: any, user: IUser) => void): void;
  //https://github.com/Automattic/mongoose/issues/8119
}