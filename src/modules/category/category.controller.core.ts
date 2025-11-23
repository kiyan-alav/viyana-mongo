import { Request, Response } from "express";
import { ENV } from "../../configs/env";
import { ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { categoryCoreService } from "./category.service.core";

export const categoryCoreController = {
  list: catchAsync(async (req: Request, res: Response) => {
    const categories = await categoryCoreService.list();

    const result = categories.map((category) => ({
      ...category.toObject(),
      image: `${ENV.BASE_URL}/public/categories/${category.image}`,
    }));

    return res.status(200).json(new ApiResponse(true, "", result));
  }),
};
