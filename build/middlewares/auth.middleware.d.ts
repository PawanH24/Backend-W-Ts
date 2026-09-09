import { Request, Response, NextFunction } from "express";
import { Role } from "../types/enum.types";
export declare const authenticate: (roles?: Role[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map