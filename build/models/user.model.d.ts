import mongoose, { Document } from "mongoose";
import { Role } from "../types/enum.types";
import { TImage } from "../types/global.types";
export type TUserDocument = {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    profile_image: TImage;
    role: Role;
} & Document;
declare const User: mongoose.Model<TUserDocument, {}, {}, {}, Document<unknown, {}, TUserDocument, {}, mongoose.DefaultSchemaOptions> & {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    profile_image: TImage;
    role: Role;
} & Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, TUserDocument>;
export default User;
//# sourceMappingURL=user.model.d.ts.map