import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";
import AppError from "../utils/appError.utils";

export const validate = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (result.success) {
      req.body = result.data.body;
      Object.assign(req.params, result.data.params);
      Object.assign(req.query, result.data.query);
      next();
    } else {
      console.log(result.error);
      const error = result.error.issues.map(({ path, message }) => {
        return { path: path.join("."), message };
      });
      next(new AppError("validation error", 400, error));
    }
  };
};
