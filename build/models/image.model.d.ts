import mongoose from "mongoose";
import { TImage } from "../types/global.types";
declare const imageSchema: mongoose.Schema<TImage, mongoose.Model<TImage, any, any, any, any, any, TImage>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, TImage, mongoose.Document<unknown, {}, TImage, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<TImage & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    path?: mongoose.SchemaDefinitionProperty<string, TImage, mongoose.Document<unknown, {}, TImage, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<TImage & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    public_id?: mongoose.SchemaDefinitionProperty<string, TImage, mongoose.Document<unknown, {}, TImage, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<TImage & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, TImage>;
export default imageSchema;
//# sourceMappingURL=image.model.d.ts.map