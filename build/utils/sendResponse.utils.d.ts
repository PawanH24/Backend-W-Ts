import { Response } from "express";
interface IResponsedData<T> {
    message: string;
    statusCode: number;
    data?: T;
}
export declare const sendResponse: <T>(res: Response, { message, statusCode, data }: IResponsedData<T>) => void;
export {};
//# sourceMappingURL=sendResponse.utils.d.ts.map