import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { paramsSchema } from "../../utils/auth";
import { categoryUpload } from "../../utils/uploader";
import { categoryAdminController } from "./category.controller.admin";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation";

const categoryAdminRouter = Router();

categoryAdminRouter.get(
  "/list",
  authMiddleware,
  authorizeRoles("ADMIN"),
  categoryAdminController.list
);

categoryAdminRouter.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN"),
  categoryUpload.single("image"),
  validateRequest(createCategorySchema, "body"),
  categoryAdminController.create
);

categoryAdminRouter
  .route("/:id")
  .delete(
    authMiddleware,
    authorizeRoles("ADMIN"),
    validateRequest(paramsSchema, "params"),
    categoryAdminController.delete
  )
  .put(
    authMiddleware,
    authorizeRoles("ADMIN"),
    validateRequest(paramsSchema, "params"),
    validateRequest(updateCategorySchema, "body"),
    categoryUpload.single("image"),
    categoryAdminController.update
  );

export default categoryAdminRouter;
