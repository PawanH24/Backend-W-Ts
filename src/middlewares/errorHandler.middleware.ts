import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = error?.message ?? "Something went wrong";
  const status = error?.status ?? "error";
  const success = error?.success ?? false;
  const statusCode = error?.statusCode ?? 500;

  res.status(statusCode).json({
    message,
    status,
    success,
    data: null,
    stack: error?.stack ?? null,
  });
};
