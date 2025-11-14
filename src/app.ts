import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler";
import authRouter from "./modules/auth/auth.routes";

const app = express();

app.use(
  "/users/avatars",
  express.static(path.join(__dirname, "..", "public", "users", "avatars"))
);
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRouter);

// Error Handler
app.use(errorHandler);

export default app;
