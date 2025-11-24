import { Request, Response } from "express";
import { ApiListResponse, ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { paginateQuery, paginateResponse } from "../../utils/pagination";
import { productCoreService } from "./product.service.core";

export const productCoreController = {
  list: catchAsync(async (req: Request, res: Response) => {
    const { pageNumber, pageSize, skip } = paginateQuery(req);
    const { categoryId } = req.query;

    const { data, totalCount } = await productCoreService.list(
      skip,
      pageSize,
      categoryId as string
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

  single: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await productCoreService.single(id);
    return res.status(200).json(new ApiResponse(true, "", product));
  }),
};
