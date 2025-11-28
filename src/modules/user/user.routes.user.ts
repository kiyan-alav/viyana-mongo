import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { userAvatarUpload } from "../../utils/uploader";
import { userController } from "./user.controller.user";
import { changePasswordSchema, changeUserInfoSchema } from "./user.validation";

const userRouter = Router();

userRouter.put(
  "/",
  authMiddleware,
  authorizeRoles("USER"),
  userAvatarUpload.single("avatar"),
  validateRequest(changeUserInfoSchema, "body"),
  userController.info
);

userRouter.get(
  "/order/list",
  authMiddleware,
  authorizeRoles("USER"),
  userController.orderList
);

userRouter.patch(
  "/password",
  authMiddleware,
  authorizeRoles("USER"),
  validateRequest(changePasswordSchema, "body"),
  userController.password
);

export default userRouter;
