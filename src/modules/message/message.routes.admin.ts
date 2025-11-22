import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { paramsSchema } from "../../utils/auth";
import { messageAdminController } from "./message.controller.admin";

const messageAdminRouter = Router();

messageAdminRouter.get(
  "/list",
  authMiddleware,
  authorizeRoles("ADMIN"),
  messageAdminController.list
);

messageAdminRouter.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  validateRequest(paramsSchema, "params"),
  messageAdminController.delete
);

export default messageAdminRouter;
