import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { paramsSchema } from "../../utils/auth";
import { productCoreController } from "./product.controller.core";

const productCoreRouter = Router();

productCoreRouter.get("/list", productCoreController.list);

productCoreRouter.get(
  "/:id",
  validateRequest(paramsSchema, "params"),
  productCoreController.single
);

export default productCoreRouter;
