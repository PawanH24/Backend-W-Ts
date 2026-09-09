import { TResponseCode } from "../types/global.types";
declare class AppError extends Error {
    message: string;
    statusCode: number;
    code?: TResponseCode | undefined;
    detail?: any[] | undefined;
    status: "error" | "fail" | "success";
    success: boolean;
    constructor(message: string, statusCode: number, code?: TResponseCode | undefined, detail?: any[] | undefined);
}
export default AppError;
//# sourceMappingURL=appError.utils.d.ts.map