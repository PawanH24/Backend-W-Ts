import { TResponseCode } from "../types/global.types";

class AppError extends Error {
  status: "error" | "fail" | "success";
  success: boolean;
  constructor(
    public message: string,
    public statusCode: number,
    public code?: TResponseCode,
    public detail?: any[],
  ) {
    super(message);
    this.statusCode = statusCode;
    // this.status = statusCode >= 200 && statusCode < 500 ? "fail" : "error";
    this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
    this.success = false;
    this.code = code ?? "INTERNAL SERVER ERROR";
    this.detail = detail;
    Error.captureStackTrace(this, AppError);
  }
}

export default AppError;
