import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { upload } from "../../utils/uploader";
import { authController } from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.validation";

const authRouter = Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  validateRequest(registerSchema, "body"),
  authController.register
);

authRouter.post(
  "/login",
  validateRequest(loginSchema, "body"),
  authController.login
);

authRouter.get("/me", authMiddleware, authController.getMe);

authRouter.get("/refresh-token", authMiddleware, authController.refreshToken);

export default authRouter;
