import mongoose, { Document } from "mongoose";
interface TOtpDocument extends Document {
    user: mongoose.Types.ObjectId;
    otp: string;
    action: string;
    active: boolean;
    expiresAt: Date;
}
declare const Otp: mongoose.Model<TOtpDocument, {}, {}, {}, Document<unknown, {}, TOtpDocument, {}, mongoose.DefaultSchemaOptions> & TOtpDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, TOtpDocument>;
export default Otp;
//# sourceMappingURL=otp.model.d.ts.map