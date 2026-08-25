import AppError from "./appError.utils";
import cloudinary from "../config/cloudinary.config";
import fs from "fs";

//file upload to cloudinary
export const uploadFileToCloudinary = async (
  file: Express.Multer.File,
  dir = "/",
) => {
  try {
    const uploadFolder = "/team_17" + dir;
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      {
        folder: uploadFolder,
      },
    );

    //delete file from upload
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return {
      path: secure_url,
      public_id,
    };
  } catch (error: any) {
    throw new AppError("something went wrong", 500, "INTERNAL SERVER ERROR", [
      { message: error.message },
    ]);
  }
};

//delete file from cloudinary
