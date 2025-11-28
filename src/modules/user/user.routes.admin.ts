import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { paramsSchema } from "../../utils/auth";
import { userAdminController } from "./user.controller.admin";
import { changeUserOrderStatusSchema } from "./user.validation";

const userAdminRouter = Router();

userAdminRouter.get(
  "/list",
  authMiddleware,
  authorizeRoles("ADMIN"),
  userAdminController.list
);

userAdminRouter.get(
  "/:id/order/list",
  authMiddleware,
  authorizeRoles("ADMIN"),
  validateRequest(paramsSchema, "params"),
  userAdminController.userOrderList
);

userAdminRouter.patch(
  "/:id/ban",
  authMiddleware,
  authorizeRoles("ADMIN"),
  validateRequest(paramsSchema, "params"),
  userAdminController.toggleBan
);

userAdminRouter.patch(
  "/order/:id/status",
  authMiddleware,
  authorizeRoles("ADMIN"),
  validateRequest(paramsSchema, "params"),
  validateRequest(changeUserOrderStatusSchema, "body"),
  userAdminController.changeStatus
);

export default userAdminRouter;
