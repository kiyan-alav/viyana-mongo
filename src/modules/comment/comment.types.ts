import mongoose, { Document } from "mongoose";

export interface IComment extends Document {
  rate: number;
  commentBody: string;
  email: string;
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

export interface CommentData {
  rate: number;
  commentBody: string;
  email: string;
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}
