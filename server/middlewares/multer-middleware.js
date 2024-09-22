import multer from "multer";
import asynchandler from "express-async-handler";
import { saveImage } from "../utils/image-handler.js";
import { v4 as uuidv4 } from "uuid";
import ErrorHandler from "../utils/error-handler.js";
const storage = multer.memoryStorage();

export const local_upload = multer({ storage });

export const local_single_upload = (name, option) =>
  asynchandler(async (req, res, next) => {
    if (req.file) {
      const { buffer } = req.file;
      const file_name = `${uuidv4()}-${Date.now()}.jpg`;
      await saveImage(buffer, file_name, option);
      req.body[name] = file_name;
    }
    return next();
  });

export const local_multipe_upload = (name, option) =>
  asynchandler(async (req, res, next) => {
    if (req.files?.length > 0) {
      req.body[name] = [];
      try {
        let arr = req.files.map(async (file) => {
          const { buffer } = file;
          const file_name = `${uuidv4()}-${Date.now()}.jpg`;
          await saveImage(buffer, file_name, option);
          return file_name;
        });
        arr = await Promise.all(arr);
        req.body[name] = arr;
      } catch (error) {
        console.error(error);
        return next(
          new ErrorHandler(error?.message || "Error saving images", 404)
        );
      }
    }
    return next();
  });
