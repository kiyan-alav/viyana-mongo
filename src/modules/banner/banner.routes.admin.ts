import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { paramsSchema } from "../../utils/auth";
import { bannerUpload } from "../../utils/uploader";
import { bannerAdminController } from "./banner.controller.admin";
import { createBannerSchema, updateBannerSchema } from "./banner.validation";

const bannerAdminRouter = Router();

bannerAdminRouter.get(
  "/list",
  authMiddleware,
  authorizeRoles("ADMIN"),
  bannerAdminController.list
);

bannerAdminRouter.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN"),
  bannerUpload.single("image"),
  validateRequest(createBannerSchema, "body"),
  bannerAdminController.create
);

bannerAdminRouter
  .route("/:id")
  .delete(
    authMiddleware,
    authorizeRoles("ADMIN"),
    validateRequest(paramsSchema, "params"),
    bannerAdminController.delete
  )
  .put(
    authMiddleware,
    authorizeRoles("ADMIN"),
    validateRequest(paramsSchema, "params"),
    validateRequest(updateBannerSchema, "body"),
    bannerUpload.single("image"),
    bannerAdminController.update
  );

export default bannerAdminRouter;
