import mongoose from "mongoose";
import { Role } from "./enums";
import { Building } from "./enums";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {IUser, IUserDocument} from "./model";

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  role: { type: String, enum: Object.values(Role), default: Role.SERVICE_DESK },
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: String,
  building: {
    type: String,
    enum: Object.values(Building),
    default: Building.AMSTERDAM
  },
  token: String
});

userSchema.set("toJSON", {
  virtuals: true
});

userSchema.virtual("fullName").get(function() {
  return this.firstName + " " + this.lastName;
});

userSchema.pre("save", async function save(next) {
  const user = this;
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    //@ts-ignore
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = function(password, callbback) {
  Object.values(Role);
  //@ts-ignore
  bcrypt.compare(password, this.password, (error: any, isMatch: boolean) => {
    if (error) return callbback(error);
    callbback(null, isMatch);
  });
};

userSchema.methods.generateToken = function(callback) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), process.env.SECRET);

  // @ts-ignore
  user.token = token;
  user.save(function(error, user) {
    if (error) return callback(error);
    callback(null, user);
  });
};

userSchema.methods.deleteToken = function(token, cb) {
  const user = this;

  //@ts-ignore
  user.update({ $unset: { token: 1 } }, function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function(token, callback) {
  const user = this;
  if (token === null || token === " "){
    callback(null, null)
  }else{
    jwt.verify(token, process.env.SECRET, function(error, decode) {
      user.findOne({ _id: decode, token: token }, function(error, user) {
        if (error) return callback(error);
        callback(null, user);
      });
    });
  }
};

export default mongoose.model("users", userSchema);
