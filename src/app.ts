import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

// Error Handler
app.use(errorHandler);

export default app;
