import { Request } from "express";
import mongoose from "mongoose";

export interface CreateUserData {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface LoginData {
  identifier: string;
  password: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: mongoose.Types.ObjectId;
    role: string;
  };
}

export interface JwtPayloadCustom {
  id: mongoose.Types.ObjectId;
  role: string;
}
