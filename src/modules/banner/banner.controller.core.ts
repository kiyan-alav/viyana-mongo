import { Request, Response } from "express";
import { ENV } from "../../configs/env";
import { ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { bannerCoreService } from "./banner.service.core";

export const bannerCoreController = {
  list: catchAsync(async (req: Request, res: Response) => {
    const bannersList = await bannerCoreService.list();

    const result = bannersList.map((banner) => ({
      ...banner.toObject(),
      image: `${ENV.BASE_URL}/public/banners/${banner.image}`,
    }));

    return res.status(200).json(new ApiResponse(true, "", result));
  }),
};
