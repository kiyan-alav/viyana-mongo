import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";
import { ApiError } from "../utils/ApiError";

export const validateRequest =
  (schema: ZodType<any>, property: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[property] || {});
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const msg = err.issues.map((e) => e.message).join(", ");
        next(new ApiError(400, `Invalid input: ${msg}`));
      } else {
        next(new ApiError(400, "Validation failed"));
      }
    }
  };
