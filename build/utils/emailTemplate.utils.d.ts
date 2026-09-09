export declare const generateAccountCreatedHtml: ({ fullName, email, created_at, agent, }: {
    fullName: string;
    email: string;
    created_at: NativeDate;
    agent: string;
}) => string;
export declare const generateAccountLoggedInHtml: ({ fullName, email, logged_in_at, agent, }: {
    fullName: string;
    email: string;
    logged_in_at: NativeDate;
    agent: string;
}) => string;
export declare const generateBookingCreatedHtml: ({ guestName, propertyName, propertyAddress, bookingReference, checkIn, checkOut, totalPrice, }: {
    guestName: string;
    propertyName: string;
    propertyAddress: {
        country: string;
        city: string;
        street_name: string;
        zipcode: string;
    };
    bookingReference: string;
    checkIn: Date;
    checkOut: Date;
    totalPrice: number;
}) => string;
export declare const generateHostBookingNotificationHtml: ({ hostName, guestName, guestEmail, propertyName, bookingReference, checkIn, checkOut, totalPrice, }: {
    hostName: string;
    guestName: string;
    guestEmail: string;
    propertyName: string;
    bookingReference: string;
    checkIn: Date;
    checkOut: Date;
    totalPrice: number;
}) => string;
export declare const generateForgotPasswordOtpHtml: ({ fullName, otp, expiresAt, }: {
    fullName: string;
    otp: string;
    expiresAt: Date;
}) => string;
//# sourceMappingURL=emailTemplate.utils.d.ts.map