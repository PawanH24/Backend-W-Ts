class AppError extends Error {
  status: "error" | "fail";
  success: boolean;
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
    this.statusCode = statusCode;
    // this.status = statusCode >= 200 && statusCode < 500 ? "fail" : "error";
    this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
    this.success = false;
    Error.captureStackTrace(this, AppError);
  }
}

export default AppError;
