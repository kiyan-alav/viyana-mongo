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
  orders?: mongoose.Types.ObjectId[];
}

export interface UpdateUserData {
  id: string;
  data: {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
  };
}

export interface UpdatePassword {
  id: string;
  data: {
    currentPassword: string;
    password: string;
  };
}
