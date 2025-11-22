import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { messageCoreService } from "./message.service.core";

export const messageCoreController = {
  create: catchAsync(async (req: Request, res: Response) => {
    const messageData = { ...req.body };
    const message = await messageCoreService.create(messageData);
    return res
      .status(201)
      .json(new ApiResponse(true, "New message sent successfully!", message));
  }),
};
