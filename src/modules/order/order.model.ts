import mongoose, { Schema } from "mongoose";

interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  orderNumber: string;
  status: "PENDING" | "ACCEPTED" | "CANCELED";
  items: IOrderItem[];
  totalQuantity: number;
  totalPrice: number;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "CANCELED"],
      default: "PENDING",
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalQuantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
