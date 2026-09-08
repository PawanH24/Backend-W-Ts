import type { Request, Response } from "express";
import Property from "../models/property.model.js";
import { catchAsync } from "../utils/catchAsync.utils.js";
import AppError from "../utils/appError.utils.js";
import { sendResponse } from "../utils/sendResponse.utils.js";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../utils/cloudinary.utils.js";
import { Role } from "../types/enum.types.js";

const folder = "/properties";

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const filter: any = {};
  const {
    query,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
    price_type,
    rooms,
    property_type,
    country,
    city,
    street_name,
  } = req.query;
  const perPage = Number(limit);
  const currentPage = Number(page);
  const skip = (currentPage - 1) * perPage;

  if (query) {
    filter.$or = [
      {
        name: {
          $regex: query,
          $options: "i",
        },
      },
      {
        description: {
          $regex: query,
          $options: "i",
        },
      },
    ];
  }
  if (minPrice || maxPrice) {
    const floor = Number(minPrice);
    const ceil = Number(maxPrice);
    if (floor) {
      filter.amount = { $gte: floor };
    }
    if (ceil) {
      filter.amount = { $lte: ceil };
    }
    if (floor && ceil) {
      filter.amount = {
        $lte: ceil,
        $gte: floor,
      };
    }
  }
  price_type && (filter.price_type = price_type);
  rooms && (filter.rooms = rooms);
  property_type && (filter.property_type = property_type);
  country && (filter["address.country"] = country);
  city && (filter["address.city"] = city);
  street_name &&
    (filter["address.street_name"] = { $regex: street_name, $options: "i" });

  //name: ?=wifi
  const property = await Property.find(filter).limit(perPage).skip(skip); //try this using only array functions
  const total = await Property.countDocuments(filter);
  const totalPage = Math.ceil(total / perPage);

  const pagination = {
    page: currentPage,
    limit: perPage,
    totalPage: totalPage,
    total: total,
    nextPage: currentPage < totalPage ? currentPage + 1 : null,
    pevPage: currentPage > 1 ? currentPage - 1 : null,
  };

  sendResponse(res, {
    message: "Displaying all properties",
    statusCode: 200,
    data: { property, pagination },
  });
});

export const getByHost = catchAsync(async (req: Request, res: Response) => {
  const user = req.user._id;
  const property = await Property.find({ host: user });

  sendResponse(res, {
    message: "Displaying all properties",
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
  const {
    name,
    description,
    amount,
    price_type,
    address,
    rooms,
    property_type,
  } = req.body;
  const user = req.user;
  const { main_image, gallery_images } = req.files as {
    main_image: Express.Multer.File[];
    gallery_images: Express.Multer.File[];
  };

  const property = await Property.findById(id);

  if (!property) throw new AppError("Property not found", 404, "NOT FOUND");

  if (property.host.toString() !== user._id.toString())
    throw new AppError("Only admin or owner can update this property", 400);

  if (name) property.name = name;
  if (description) property.description = description;
  if (amount) property.amount = amount;
  if (price_type) property.price_type = price_type;
  if (address) property.address = address;
  if (rooms) property.rooms = rooms;
  if (property_type) property.property_type = property_type;

  if (main_image?.[0]) {
    const { path, public_id } = await uploadFileToCloudinary(
      main_image[0],
      folder,
    );
    await deleteFileFromCloudinary(property.main_image.public_id);
    property.main_image = {
      path,
      public_id,
    };
  }

  if (gallery_images && gallery_images.length > 0) {
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
  }
  await property.save();

  sendResponse(res, {
    message: "Property updated successfully",
    statusCode: 200,
    data: property,
  });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;

  const property = await Property.findOne({ _id: id });

  if (!property) {
    throw new AppError("Property not found", 404, "NOT FOUND");
  }

  if (
    user.role !== Role.ADMIN &&
    property.host.toString() !== user._id.toString()
  )
    throw new AppError("Only admin or owner can update this property", 400);

  await deleteFileFromCloudinary(property.main_image.public_id);

  const promises = property.gallery_images.map((img) =>
    deleteFileFromCloudinary(img.public_id),
  );
  await Promise.all(promises);

  await property.deleteOne();
  sendResponse(res, {
    message: "Property deleted successfully",
    statusCode: 200,
    data: property,
  });
});
