import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { orderCoreController } from "./order.controller.core";
import { orderDataSchema } from "./order.validation";

const orderCoreRouter = Router();

orderCoreRouter.post(
  "/",
  authMiddleware,
  validateRequest(orderDataSchema, "body"),
  orderCoreController.create
);

export default orderCoreRouter;
