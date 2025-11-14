import { Document } from "mongoose";

export interface IBanner extends Document {
  link: string;
  image: string;
  type: "SQUARE" | "RECTANGLE";
}
