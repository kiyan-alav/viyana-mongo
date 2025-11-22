import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler";
import authRouter from "./modules/auth/auth.routes";
import bannerAdminRouter from "./modules/banner/banner.routes.admin";
import { setupSwagger } from "./swagger/swagger";
import bannerCoreRouter from "./modules/banner/banner.routes.core";
import messageAdminRouter from "./modules/message/message.routes.admin";
import messageCoreRouter from "./modules/message/message.routes.core";

const app = express();

app.use("/public", express.static(path.join(__dirname, "..", "public")));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * ! Routes
 */
// ! Auth
app.use("/api/auth", authRouter);

// ! Banner
app.use("/api/admin/banner", bannerAdminRouter);
app.use("/api/banner", bannerCoreRouter);

// ! Banner
app.use("/api/admin/message", messageAdminRouter);
app.use("/api/message", messageCoreRouter);

// ! Error Handler
app.use(errorHandler);

setupSwagger(app);

export default app;
