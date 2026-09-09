import mongoose, { Document } from "mongoose";
export type TReviewDocument = {
    property: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    booking: mongoose.Types.ObjectId;
    rating: number;
    comment?: string;
} & Document;
declare const Review: mongoose.Model<TReviewDocument, {}, {}, {}, Document<unknown, {}, TReviewDocument, {}, mongoose.DefaultSchemaOptions> & {
    property: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    booking: mongoose.Types.ObjectId;
    rating: number;
    comment?: string;
} & Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, TReviewDocument>;
export default Review;
//# sourceMappingURL=review.model.d.ts.map