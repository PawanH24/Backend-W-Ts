import mongoose from "mongoose";
import { TImage } from "../types/global.types";
import { TUserDocument } from "./user.model";
interface TAmenities {
    name: string;
    description: string;
    icon: TImage;
    user: TUserDocument;
}
declare const Amenities: mongoose.Model<TAmenities, {}, {}, {}, mongoose.Document<unknown, {}, TAmenities, {}, mongoose.DefaultSchemaOptions> & TAmenities & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, TAmenities>;
export default Amenities;
//# sourceMappingURL=amenities.model.d.ts.map