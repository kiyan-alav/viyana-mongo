import { Document } from "mongoose";

export interface IMessage extends Document {
  sender: string;
  email: string;
  title: string;
  text: string;
}