import mongoose from "mongoose";
interface TBooking {
    booking_reference: string;
    user: mongoose.Types.ObjectId;
    property: mongoose.Types.ObjectId;
    host: mongoose.Types.ObjectId;
    check_in: Date;
    check_out: Date;
    total_price: number;
    payment_status: boolean;
}
declare const Booking: mongoose.Model<TBooking, {}, {}, {}, mongoose.Document<unknown, {}, TBooking, {}, mongoose.DefaultSchemaOptions> & TBooking & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, TBooking>;
export default Booking;
//# sourceMappingURL=booking.model.d.ts.map