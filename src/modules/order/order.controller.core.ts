import { Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { AuthRequest } from "../auth/auth.types";
import { orderCoreService } from "./order.service.core";

export const orderCoreController = {
  create: catchAsync(async (req: AuthRequest, res: Response) => {
    const orderData = {
      user: String(req.user?.id),
      items: req.body.items,
    };

    const newOrderData = await orderCoreService.create(orderData);

    return res
      .status(201)
      .json(
        new ApiResponse(true, "Order registered successfully!", newOrderData)
      );
  }),
};
