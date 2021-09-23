import { Role } from "./enums";
import { Building } from "./enums";

export interface IUser {
  _id?: String;
  role: Role;
  firstName: String;
  lastName: String;
  phoneNumber: String;
  email: String;
  password: String;
  building: Building;
  token: String;
}

export interface IUserDocument extends IUser, Document{
  comparePassword(candidatePassword: string, callback: (error: any, isMatch: boolean) => void): void;
  generateToken(callback: (error: any, user: IUser) => void): void;
  deleteToken(token: string, callback: (error: any, user: IUser) => void): void;
  //https://github.com/Automattic/mongoose/issues/8119
}