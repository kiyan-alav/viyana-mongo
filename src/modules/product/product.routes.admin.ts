import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { paramsSchema } from "../../utils/auth";
import { productUpload } from "../../utils/uploader";
import { productAdminController } from "./product.controller.admin";
import { createProductSchema, updateProductSchema } from "./product.validation";

const productAdminRouter = Router();

productAdminRouter.get(
  "/list",
  authMiddleware,
  authorizeRoles("ADMIN"),
  productAdminController.list
);

productAdminRouter.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN"),
  productUpload.array("productImages", 3),
  validateRequest(createProductSchema, "body"),
  productAdminController.create
);

productAdminRouter
  .route("/:id")
  .get(
    authMiddleware,
    authorizeRoles("ADMIN"),
    validateRequest(paramsSchema, "params"),
    productAdminController.single
  )
  .delete(
    authMiddleware,
    authorizeRoles("ADMIN"),
    validateRequest(paramsSchema, "params"),
    productAdminController.delete
  )
  .put(
    authMiddleware,
    authorizeRoles("ADMIN"),
    validateRequest(paramsSchema, "params"),
    productUpload.array("productImages", 3),
    validateRequest(updateProductSchema, "body"),
    productAdminController.update
  );

export default productAdminRouter;
