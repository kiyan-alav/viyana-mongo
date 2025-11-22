import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { messageCoreController } from "./message.controller.core";
import { createMessageSchema } from "./message.validation";

const messageCoreRouter = Router();

messageCoreRouter.post(
  "/",
  authMiddleware,
  validateRequest(createMessageSchema, "body"),
  messageCoreController.create
);

export default messageCoreRouter;
