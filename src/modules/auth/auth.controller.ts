import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";

export const authController = {
  register: catchAsync(async (req: Request, res: Response) => {
    const userData = {
      ...req.body,
      avatar: req.file ? req.file.filename : "",
    };
    const user = await authService.register(userData);
    return res
      .status(201)
      .json(new ApiResponse(true, "New User Created Successfully!", user));
  }),

  login: catchAsync(async (req: Request, res: Response) => {
    const { accessToken, refreshToken, existingUser } = await authService.login(
      req.body
    );
    const loginData = {
      accessToken,
      refreshToken,
      user: existingUser,
    };
    return res
      .status(201)
      .json(new ApiResponse(true, "New User Created Successfully!", loginData));
  }),
};
