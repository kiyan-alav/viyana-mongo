import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { bannerCoreService } from "./banner.service.core";

export const bannerCoreController = {
  list: catchAsync(async (req: Request, res: Response) => {
    const bannersList = await bannerCoreService.list();

    return res.status(200).json(new ApiResponse(true, "", bannersList));
  }),
};
