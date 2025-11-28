import { ApiError } from "../../utils/ApiError";
import { hashPassword, verifyPassword } from "../../utils/auth";
import { paginateModel } from "../base.services";
import Order from "../order/order.model";
import User from "./user.model";
import { UpdatePassword, UpdateUserData } from "./user.types";

export const userService = {
  async info({ data, id }: UpdateUserData) {
    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return updatedUser;
  },

  async orderList(skip: number, pageSize: number) {
    const { data, totalCount } = await paginateModel(
      Order,
      skip,
      pageSize,
      {},
      [
        {
          path: "items.product",
          select: "_id title price discount",
        },
      ],
      "_id orderNumber status items totalQuantity totalPrice createdAt"
    );
    return {
      data,
      totalCount,
    };
  },

  async password({ data, id }: UpdatePassword) {
    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const verifyCurrentPassword = await verifyPassword(
      data.currentPassword,
      user.password
    );

    if (!verifyCurrentPassword) {
      throw new ApiError(400, "Current password is wrong");
    }

    user.password = await hashPassword(data.password);
    await user.save();
  },
};
