import { Request, Response } from "express";
import { ApiListResponse, ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { paginateQuery, paginateResponse } from "../../utils/pagination";
import { userAdminService } from "./user.service.admin";

export const userAdminController = {
  list: catchAsync(async (req: Request, res: Response) => {
    const { pageNumber, pageSize, skip } = paginateQuery(req);
    const { data, totalCount } = await userAdminService.list(skip, pageSize);

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

  toggleBan: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userAdminService.toggleBan(id);

    const message = user.isActive ? "User unbanned!" : "User banned!";
    return res.status(200).json(new ApiResponse(true, message, user));
  }),

  userOrderList: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { pageNumber, pageSize, skip } = paginateQuery(req);
    const { data, totalCount } = await userAdminService.userOrderList(
      id,
      skip,
      pageSize
    );

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

  changeStatus: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await userAdminService.changeStatus(id, status);

    return res
      .status(200)
      .json(new ApiResponse(true, "Product status changed!", updatedOrder));
  }),
};
