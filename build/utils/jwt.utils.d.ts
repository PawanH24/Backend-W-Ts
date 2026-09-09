import mongoose from "mongoose";
import { Role } from "../types/enum.types";
export type TJwtPayload = {
    _id: mongoose.Types.ObjectId;
    role: Role;
    email: string;
};
type TJwtReturn = TJwtPayload & {
    iat: number;
    exp: number;
};
export declare const generateJwtToken: (payload: TJwtPayload) => string;
export declare const verifyToken: (token: string) => TJwtReturn;
export {};
//# sourceMappingURL=jwt.utils.d.ts.map