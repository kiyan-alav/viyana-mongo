import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  fullName?: string;
  mobile: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  refreshToken?: string;
  avatar?: string;
  isActive: boolean;
  orders?: mongoose.Types.ObjectId;
}
