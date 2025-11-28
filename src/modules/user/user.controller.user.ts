import { Request, Response } from "express";
import { ENV } from "../../configs/env";
import { ApiListResponse, ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { paginateQuery, paginateResponse } from "../../utils/pagination";
import { AuthRequest } from "../auth/auth.types";
import { userService } from "./user.service.user";

export const userController = {
  info: catchAsync(async (req: AuthRequest, res: Response) => {
    const updateUserInfoData = {
      ...req.body,
      ...(req.file && {
        avatar: `${ENV.BASE_URL}/public/users/avatars/${req.file.filename}`,
      }),
    };

    const updatedInfo = await userService.info({
      data: updateUserInfoData,
      id: String(req.user?.id),
    });

    return res
      .status(200)
      .json(new ApiResponse(true, "User info updated", updatedInfo));
  }),

  orderList: catchAsync(async (req: Request, res: Response) => {
    const { pageNumber, pageSize, skip } = paginateQuery(req);
    const { data, totalCount } = await userService.orderList(skip, pageSize);

    return res
      .status(200)
      .json(
        new ApiListResponse(
          true,
          "",
          data,
          paginateResponse(pageNumber, pageSize, totalCount)
        )
      );
  }),

  password: catchAsync(async (req: AuthRequest, res: Response) => {
    await userService.password({
      id: String(req.user?.id),
      data: {
        currentPassword: req.body.currentPassword,
        password: req.body.password,
      },
    });

    return res.status(200).json(new ApiResponse(true, "User password updated"));
  }),
};
