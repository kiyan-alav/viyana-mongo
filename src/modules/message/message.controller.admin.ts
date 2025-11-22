import { Request, Response } from "express";
import { ApiListResponse, ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { paginateQuery, paginateResponse } from "../../utils/pagination";
import { messageAdminService } from "./message.service.admin";

export const messageAdminController = {
  list: catchAsync(async (req: Request, res: Response) => {
    const { pageNumber, pageSize, skip } = paginateQuery(req);

    const { data, totalCount } = await messageAdminService.list(skip, pageSize);

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

  delete: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const message = await messageAdminService.delete(id);
    return res
      .status(200)
      .json(new ApiResponse(true, "Message removed successfully!", message));
  }),
};
