import { Request, Response } from "express";
import { ENV } from "../../configs/env";
import { ApiListResponse, ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { paginateQuery, paginateResponse } from "../../utils/pagination";
import { bannerAdminService } from "./banner.service.admin";

export const bannerAdminController = {
  list: catchAsync(async (req: Request, res: Response) => {
    const { pageNumber, pageSize, skip } = paginateQuery(req);
    const { data, totalCount } = await bannerAdminService.list(skip, pageSize);

    const result = data.map((banner) => ({
      ...banner.toObject(),
      image: `${ENV.BASE_URL}/public/banners/${banner.image}`,
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
    const bannerData = {
      ...req.body,
      image: req.file ? req.file.filename : "",
    };
    const banner = await bannerAdminService.create(bannerData);
    return res
      .status(201)
      .json(new ApiResponse(true, "New banner created successfully!", banner));
  }),

  delete: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const banner = await bannerAdminService.delete(id);
    return res
      .status(200)
      .json(new ApiResponse(true, "Banner removed successfully!", banner));
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const bannerData = {
      ...req.body,
      ...(req.file && { image: req.file.filename }),
    };

    const banner = await bannerAdminService.update({
      id,
      data: bannerData,
    });

    return res
      .status(200)
      .json(new ApiResponse(true, "Banner updated successfully!", banner));
  }),
};
