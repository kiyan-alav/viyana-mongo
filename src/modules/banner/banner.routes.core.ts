import { Router } from "express";
import { bannerCoreController } from "./banner.controller.core";

const bannerCoreRouter = Router();

bannerCoreRouter.get("/list", bannerCoreController.list);

export default bannerCoreRouter;
