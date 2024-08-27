import multer from "multer";
import asynchandler from "express-async-handler";
import { saveImage } from "../utils/image-handler.js";

const storage = multer.memoryStorage();

export const local_upload = multer({ storage });

export const local_single_upload = (name, option) =>
  asynchandler((req, res, next) => {
    if (req.file) {
      const { buffer } = req.file;
      const file_name = `image-${Math.floor(Math.random() * 1000)}-${Math.floor(
        Math.random() * 4000
      )}-${Date.now()}.png`;
      saveImage(buffer, file_name, option);
      req.body[name] = `${process.env.DOMAINE_NAME}/${option}/${file_name}`;
    }
    return next();
  });

export const local_multipe_upload = (name, option) =>
  asynchandler((req, res, next) => {
    if (req.files?.length > 0) {
      req.body[name] = [];
      req.files.map((file) => {
        const { buffer } = file;
        const file_name = `image-${Math.floor(
          Math.random() * 1000
        )}-${Math.floor(Math.random() * 4000)}-${Date.now()}.png`;
        saveImage(buffer, file_name, option);
        req.body[name].push(
          `${process.env.DOMAINE_NAME}/${option}/${file_name}`
        );
      });
    }
    return next();
  });
