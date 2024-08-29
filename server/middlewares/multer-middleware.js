import multer from "multer";
import asynchandler from "express-async-handler";
import { saveImage } from "../utils/image-handler.js";
import { v4 as uuidv4 } from "uuid";
const storage = multer.memoryStorage();

export const local_upload = multer({ storage });

export const local_single_upload = (name, option) =>
  asynchandler((req, res, next) => {
    if (req.file) {
      const { buffer } = req.file;
      const file_name = `${uuidv4()}-${Date.now()}.jpg`;
      saveImage(buffer, file_name, option);
      req.body[name] = file_name;
    }
    return next();
  });

export const local_multipe_upload = (name, option) =>
  asynchandler((req, res, next) => {
    if (req.files?.length > 0) {
      req.body[name] = [];
      req.files.map((file) => {
        const { buffer } = file;
        const file_name = `${uuidv4()}-${Date.now()}.jpg`;
        saveImage(buffer, file_name, option);
        req.body[name].push(file_name);
      });
    }
    return next();
  });
