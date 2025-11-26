import { Request, Response } from "express";
import { ApiListResponse, ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { paginateQuery, paginateResponse } from "../../utils/pagination";
import { commentAdminService } from "./comment.service.admin";

export const commentAdminController = {
  list: catchAsync(async (req: Request, res: Response) => {
    const { pageNumber, pageSize, skip } = paginateQuery(req);
    const { data, totalCount } = await commentAdminService.list(skip, pageSize);

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

  accept: catchAsync(async (req: Request, res: Response) => {
    const comment = await commentAdminService.accept(req.params.id);

    return res
      .status(200)
      .json(new ApiResponse(true, "Comment status changed!", comment));
  }),

  reject: catchAsync(async (req: Request, res: Response) => {
    const comment = await commentAdminService.reject(req.params.id);

    return res
      .status(200)
      .json(new ApiResponse(true, "Comment status changed!", comment));
  }),
};
