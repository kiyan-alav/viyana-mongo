import { Router } from "express";
import { categoryCoreController } from "./category.controller.core";

const categoryCoreRouter = Router();

categoryCoreRouter.get("/list", categoryCoreController.list);

export default categoryCoreRouter;
