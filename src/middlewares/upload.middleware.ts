import multer from "multer";
import fs from "fs";
import { Request } from "express";

const uploader = () => {
  const folder = "uploads/";
  const fileSize = 5 * 1024 * 1024;
  const allowed_exts = [".png", ".jpg", "jpeg", ".webp", ".svg", ".pdf"];
  const allowed_mime_types = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/svg+xml",
    "application/pdf",
  ];

  //create upload folder is not exixts
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  //multer disk storage
  const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback) => {
      callback(null, "uploads/");
    },
    filename: (req: Request, file: Express.Multer.File, callback) => {
      const fileName = Date.now() + "-" + file.originalname;
      callback(null, fileName);
    },
  });

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {};

  //multer upload instance
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: fileSize,
    },
  });
  return upload;
};

export default uploader;
