import type { Request, Response } from "express";
import Property from "../models/property.model.js";
import { catchAsync } from "../utils/catchAsync.utils.js";
import AppError from "../utils/appError.utils.js";
import { sendResponse } from "../utils/sendResponse.utils.js";
import { uploadFileToCloudinary } from "../utils/cloudinary.utils.js";

const folder = "/properties";

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const property = await Property.find({});

  sendResponse(res, {
    message: "Displaying all reviews",
    statusCode: 200,
    data: property,
  });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const property = await Property.findById(id);

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  sendResponse(res, {
    message: "Property found successfully",
    statusCode: 200,
    data: property,
  });
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const { main_image, gallery_images } = req.files as {
    main_image: Express.Multer.File[];
    gallery_images: Express.Multer.File[];
  };
  const {
    name,
    description,
    amount,
    price_type,
    address,
    rooms,
    property_type,
  } = req.body;
  const { _id } = req.user;

  if (!main_image[0]) throw new AppError("Main image is required", 400);
  if (!gallery_images || gallery_images.length < 2) {
    throw new AppError("Gallery image is required", 400);
  }

  const property = new Property({
    name,
    description,
    amount,
    price_type,
    address,
    rooms,
    property_type,
    host: _id,
  });

  const { path, public_id } = await uploadFileToCloudinary(
    main_image[0],
    folder,
  );
  property.main_image = {
    path,
    public_id,
  };

  const promises = gallery_images.map((file) =>
    uploadFileToCloudinary(file, folder),
  );
  const results = await Promise.allSettled(promises);
  const files = results
    .filter((file) => file.status === "fulfilled")
    .map((file) => {
      return file.value;
    });

  property.gallery_images = files;
  await property.save();

  sendResponse(res, {
    message: "Property created successfully",
    statusCode: 201,
    data: property,
  });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const property = await Property.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  sendResponse(res, {
    message: "Property updated successfully",
    statusCode: 200,
    data: property,
  });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const property = await Property.findByIdAndDelete(id);

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  sendResponse(res, {
    message: "Property deleted successfully",
    statusCode: 200,
    data: property,
  });
});
