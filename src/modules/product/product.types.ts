import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  category: mongoose.Types.ObjectId;
  stock: number;
  discount: number;
  specifications: string;
  details: string;
  productImages: string[];
  comment?: mongoose.Types.ObjectId;
}