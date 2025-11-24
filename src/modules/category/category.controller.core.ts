import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { categoryCoreService } from "./category.service.core";

export const categoryCoreController = {
  list: catchAsync(async (req: Request, res: Response) => {
    const categories = await categoryCoreService.list();

    return res.status(200).json(new ApiResponse(true, "", categories));
  }),
};
