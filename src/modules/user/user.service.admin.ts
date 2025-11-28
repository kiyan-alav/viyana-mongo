import { ApiError } from "../../utils/ApiError";
import { paginateModel } from "../base.services";
import Order from "../order/order.model";
import User from "./user.model";

export const userAdminService = {
  async list(skip: number, pageSize: number) {
    const { data, totalCount } = await paginateModel(
      User,
      skip,
      pageSize,
      {},
      [],
      "_id firstName lastName mobile email createdAt isActive role"
    );
    return { data, totalCount };
  },

  async toggleBan(id: string) {
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found!");
    }

    user.isActive = !user.isActive;
    await user.save();

    return user;
  },

  async userOrderList(id: string, skip: number, pageSize: number) {
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found!");
    }

    const { data, totalCount } = await paginateModel(
      Order,
      skip,
      pageSize,
      { user: id },
      [
        { path: "user", select: "firstName lastName" },
        { path: "items.product", select: "_id title price discount" },
      ],
      "-updatedAt -__v"
    );

    return {
      data,
      totalCount,
    };
  },

  async changeStatus(id: string, status: string) {
    const order = await Order.findById(id);
    if (!order) {
      throw new ApiError(404, "Order not found!");
    }

    order.status = status;
    await order.save();

    return order;
  },
};
