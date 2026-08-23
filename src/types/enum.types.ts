//property interfaces

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  HOST = "HOST",
}
export enum PropertyType {
  Apartment = "Apartment",
  House = "House",
  Banglow = "Banglow",
  Villa = "Villa",
}

export enum PriceType {
  PER_HOUR = "per_hour",
  PER_DAY = "per_day",
  PER_WEEK = "per_week",
  PER_MONTH = "per_month",
}

export enum AmenitiesType {
  WIFI = "wifi",
  SMART_TV = "smart_tv",
  KITCHEN = "kitchen",
  REFRIGERATOR = "refrigerator",
  MICROWAVE = "microwave",
  AIR_CONDITIONING = "air_conditioning",
  FREE_PARKING = "free_parking",
  SWIMMING_POOL = "swimming_pool",
  GYM = "gym",
  SMOKE_ALARM = "smoke_alarm",
  FIRST_AID_KIT = "first_aid_kit",
  FIRE_EXTINGUISHER = "fire_extinguisher",
}

export enum ImageType {
  AMENITY_ICON = "amenity_icon",
  PROPERTY_MAIN = "property_main",
  PROPERTY_GALLERY = "property_gallery",
  USER_PROFILE = "user_profile",
}
