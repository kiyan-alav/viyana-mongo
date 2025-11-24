import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler";
import authRouter from "./modules/auth/auth.routes";
import bannerAdminRouter from "./modules/banner/banner.routes.admin";
import bannerCoreRouter from "./modules/banner/banner.routes.core";
import categoryAdminRouter from "./modules/category/category.routes.admin";
import categoryCoreRouter from "./modules/category/category.routes.core";
import messageAdminRouter from "./modules/message/message.routes.admin";
import messageCoreRouter from "./modules/message/message.routes.core";
import productAdminRouter from "./modules/product/product.routes.admin";
import { setupSwagger } from "./swagger/swagger";

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

// ! Category
app.use("/api/admin/category", categoryAdminRouter);
app.use("/api/category", categoryCoreRouter);

// ! Message
app.use("/api/admin/message", messageAdminRouter);
app.use("/api/message", messageCoreRouter);

// ! Product
app.use("/api/admin/product", productAdminRouter);

// ! Error Handler
app.use(errorHandler);

setupSwagger(app);

export default app;
