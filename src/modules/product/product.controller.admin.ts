import { Request, Response } from "express";
import { ENV } from "../../configs/env";
import { ApiListResponse, ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { paginateQuery, paginateResponse } from "../../utils/pagination";
import { productAdminService } from "./product.service.admin";

export const productAdminController = {
  list: catchAsync(async (req: Request, res: Response) => {
    const { pageNumber, pageSize, skip } = paginateQuery(req);
    const { data, totalCount } = await productAdminService.list(skip, pageSize);

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
    const product = await productAdminService.single(id);
    return res.status(200).json(new ApiResponse(true, "", product));
  }),

  create: catchAsync(async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];

    const images = files.map(
      (file) => `${ENV.BASE_URL}/public/products/${file.filename}`
    );

    const productData = {
      ...req.body,
      productImages: images,
    };

    const product = await productAdminService.create(productData);

    return res
      .status(201)
      .json(
        new ApiResponse(true, "New product created successfully!", product)
      );
  }),

  delete: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await productAdminService.delete(id);
    return res
      .status(200)
      .json(new ApiResponse(true, "Product removed successfully!", product));
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const files = req.files as Express.Multer.File[];

    let images: string[] | undefined = undefined;

    if (files && files.length > 0) {
      images = files.map(
        (file) => `${ENV.BASE_URL}/public/products/${file.filename}`
      );
    }

    const productData = {
      ...req.body,
      ...(images && { productImages: images }),
    };

    const product = await productAdminService.update({
      id,
      data: productData,
    });

    return res
      .status(200)
      .json(new ApiResponse(true, "Product updated successfully!", product));
  }),
};
