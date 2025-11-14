import mongoose, { Document } from "mongoose";

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  orderNumber: string;
  status: "PENDING" | "ACCEPTED" | "CANCELED";
  items: IOrderItem[];
  totalQuantity: number;
  totalPrice: number;
}