"use strict";
//property interfaces
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpAction = exports.ImageType = exports.PriceType = exports.PropertyType = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
    Role["HOST"] = "HOST";
})(Role || (exports.Role = Role = {}));
var PropertyType;
(function (PropertyType) {
    PropertyType["Apartment"] = "Apartment";
    PropertyType["House"] = "House";
    PropertyType["Banglow"] = "Banglow";
    PropertyType["Villa"] = "Villa";
})(PropertyType || (exports.PropertyType = PropertyType = {}));
var PriceType;
(function (PriceType) {
    PriceType["PER_HOUR"] = "per_hour";
    PriceType["PER_DAY"] = "per_day";
    PriceType["PER_WEEK"] = "per_week";
    PriceType["PER_MONTH"] = "per_month";
})(PriceType || (exports.PriceType = PriceType = {}));
// export enum AmenitiesType {
//   WIFI = "wifi",
//   SMART_TV = "smart_tv",
//   KITCHEN = "kitchen",
//   REFRIGERATOR = "refrigerator",
//   MICROWAVE = "microwave",
//   AIR_CONDITIONING = "air_conditioning",
//   FREE_PARKING = "free_parking",
//   SWIMMING_POOL = "swimming_pool",
//   GYM = "gym",
//   SMOKE_ALARM = "smoke_alarm",
//   FIRST_AID_KIT = "first_aid_kit",
//   FIRE_EXTINGUISHER = "fire_extinguisher",
// }
var ImageType;
(function (ImageType) {
    ImageType["AMENITY_ICON"] = "amenity_icon";
    ImageType["PROPERTY_MAIN"] = "property_main";
    ImageType["PROPERTY_GALLERY"] = "property_gallery";
    ImageType["USER_PROFILE"] = "user_profile";
})(ImageType || (exports.ImageType = ImageType = {}));
var OtpAction;
(function (OtpAction) {
    OtpAction["CHANGE_PASSWORD"] = "change_password";
    OtpAction["FORGOT_PASSWORD"] = "forgot_password";
    OtpAction["VERIFY_EMAIL"] = "verify_email";
})(OtpAction || (exports.OtpAction = OtpAction = {}));
//# sourceMappingURL=enum.types.js.map