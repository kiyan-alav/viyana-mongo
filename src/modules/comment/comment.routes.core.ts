import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { commentCoreController } from "./comment.controller.core";
import { commentDataSchema } from "./comment.validation";

const commentCoreRouter = Router();

commentCoreRouter.post(
  "/",
  authMiddleware,
  validateRequest(commentDataSchema, "body"),
  commentCoreController.create
);

export default commentCoreRouter;
