import multer from "multer";
import fs from "fs";
import { Request } from "express";

const folder = "uploads/";

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

//multer upload instance
const upload = multer({
  storage: storage,
});

export default upload;
