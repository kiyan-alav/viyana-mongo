import { Request, Response } from "express";
import { ENV } from "../../configs/env";
import { ApiListResponse, ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { paginateQuery, paginateResponse } from "../../utils/pagination";
import { categoryAdminService } from "./category.service.admin";

export const categoryAdminController = {
  list: catchAsync(async (req: Request, res: Response) => {
    const { pageNumber, pageSize, skip } = paginateQuery(req);
    const { data, totalCount } = await categoryAdminService.list(
      skip,
      pageSize
    );

    const result = data.map((category) => ({
      ...category.toObject(),
      image: `${ENV.BASE_URL}/public/categories/${category.image}`,
    }));

    return res
      .status(200)
      .json(
        new ApiListResponse(
          true,
          "",
          result,
          paginateResponse(pageNumber, pageSize, totalCount)
        )
      );
  }),

  create: catchAsync(async (req: Request, res: Response) => {
    const categoryData = {
      ...req.body,
      image: req.file ? req.file.filename : "",
    };
    const category = await categoryAdminService.create(categoryData);

    return res
      .status(201)
      .json(
        new ApiResponse(true, "New category created successfully!", category)
      );
  }),

  delete: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await categoryAdminService.delete(id);
    return res
      .status(200)
      .json(new ApiResponse(true, "Category removed successfully!", category));
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const categoryData = {
      ...req.body,
      ...(req.file && { image: req.file.fieldname }),
    };

    const category = await categoryAdminService.update({
      id,
      data: categoryData,
    });

    return res
      .status(200)
      .json(new ApiResponse(true, "Category updated successfully!", category));
  }),
};
