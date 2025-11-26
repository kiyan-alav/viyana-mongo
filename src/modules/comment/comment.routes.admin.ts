import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { paramsSchema } from "../../utils/auth";
import { commentAdminController } from "./comment.controller.admin";

const commentAdminRouter = Router();

commentAdminRouter.get(
  "/list",
  authMiddleware,
  authorizeRoles("ADMIN"),
  commentAdminController.list
);

commentAdminRouter.patch(
  "/:id/accept",
  authMiddleware,
  authorizeRoles("ADMIN"),
  validateRequest(paramsSchema, "params"),
  commentAdminController.accept
);

commentAdminRouter.patch(
  "/:id/reject",
  authMiddleware,
  authorizeRoles("ADMIN"),
  validateRequest(paramsSchema, "params"),
  commentAdminController.reject
);

export default commentAdminRouter;
