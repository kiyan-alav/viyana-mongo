import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError";
import Product from "../product/product.model";
import Order from "./order.model";
import { OrderData } from "./order.types";

export const orderCoreService = {
  async create({ user, items }: OrderData) {
    let totalPrice = 0;
    let totalQuantity = 0;

    const populatedProducts = await Promise.all(
      items.map(async (item: { product: string; quantity: number }) => {
        const foundedProduct = await Product.findById(item.product);
        if (!foundedProduct) {
          throw new ApiError(400, "Product not found");
        }

        if (foundedProduct.stock < item.quantity) {
          throw new ApiError(400, "Product quantity is not enough!");
        }

        let itemTotal = 0;

        if (
          typeof foundedProduct.discount === "number" &&
          foundedProduct.discount > 0
        ) {
          const discountedPrice =
            foundedProduct.price * (1 - foundedProduct.discount / 100);
          itemTotal = discountedPrice * item.quantity;
        } else {
          itemTotal = foundedProduct.price * item.quantity;
        }

        totalPrice += itemTotal;
        totalQuantity += item.quantity;

        foundedProduct.stock -= item.quantity;
        await foundedProduct.save();

        return {
          product: foundedProduct._id,
          quantity: item.quantity,
        };
      })
    );

    totalPrice = Math.floor(totalPrice);

    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newOrder = await Order.create({
      user: new mongoose.Types.ObjectId(user),
      orderNumber,
      items: populatedProducts,
      totalQuantity,
      totalPrice,
    });

    return newOrder;
  },
};
