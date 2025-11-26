import { Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { AuthRequest } from "../auth/auth.types";
import { commentCoreService } from "./comment.service.core";

export const commentCoreController = {
  create: catchAsync(async (req: AuthRequest, res: Response) => {
    const commentData = {
      ...req.body,
      user: req.user?.id,
    };
    const newComment = await commentCoreService.create(commentData);
    return res
      .status(201)
      .json(
        new ApiResponse(true, "New comment created successfully!", newComment)
      );
  }),
};
