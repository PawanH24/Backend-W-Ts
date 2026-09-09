import mongoose from "mongoose";
import { PropertyType, PriceType } from "../types/enum.types";
import { TImage } from "../types/global.types";
interface TProperty extends Document {
    host: mongoose.Types.ObjectId;
    name: string;
    description: string;
    price_type: PriceType;
    amount: number;
    address: {
        country: string;
        city: string;
        street_name: string;
        zipcode: string;
    };
    rooms: number;
    property_type: PropertyType;
    main_image: TImage;
    gallery_images: TImage[];
}
declare const Property: mongoose.Model<TProperty, {}, {}, {}, mongoose.Document<unknown, {}, TProperty, {}, mongoose.DefaultSchemaOptions> & TProperty & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, TProperty>;
export default Property;
//# sourceMappingURL=property.model.d.ts.map