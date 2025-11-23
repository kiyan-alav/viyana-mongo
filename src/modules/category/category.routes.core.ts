import { Router } from "express";
import { categoryAdminController } from "./category.controller.admin";
import { categoryCoreController } from "./category.controller.core";

const categoryCoreRouter = Router();

categoryCoreRouter.get("/list", categoryCoreController.list);

export default categoryCoreRouter;
