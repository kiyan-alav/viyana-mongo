import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { AuthRequest } from "./auth.types";

export const authController = {
  register: catchAsync(async (req: Request, res: Response) => {
    const userData = {
      ...req.body,
      avatar: req.file ? req.file.filename : "",
    };
    const user = await authService.register(userData);
    return res
      .status(201)
      .json(new ApiResponse(true, "New user created successfully!", user));
  }),

  login: catchAsync(async (req: Request, res: Response) => {
    const { accessToken, refreshToken, userPlain } = await authService.login(
      req.body
    );
    const loginData = {
      accessToken,
      refreshToken,
      user: userPlain,
    };
    return res
      .status(200)
      .json(new ApiResponse(true, "User logged in successfully!", loginData));
  }),

  getMe: catchAsync(async (req: AuthRequest, res: Response) => {
    const user = await authService.getMe(req);

    return res.status(200).json(new ApiResponse(true, "", user));
  }),

  refreshToken: catchAsync(async (req: AuthRequest, res: Response) => {
    const newAccessToken = await authService.refreshToken(req);

    return res.status(200).json(
      new ApiResponse(true, "", {
        accessToken: newAccessToken,
      })
    );
  }),
};
