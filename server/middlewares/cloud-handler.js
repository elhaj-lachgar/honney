import fs from "fs";
import { CloudImage } from "../utils/cloud.js";
import asynchandler from "express-async-handler";
import path from "path";
import ErrorHandler from "../utils/error-handler.js";

export const SingleCloudHandler = (folder, key) =>
  asynchandler(async (req, res, next) => {
    const image = req.body[key];
    if (image) {
      const uploader = async (file) => CloudImage(file, folder);
      try {
        const newPath = await uploader(
          path.join(import.meta.dirname, `../upload/${folder}/${image}`)
        );
        req.body[key] = newPath.url;
        fs.unlinkSync(
          path.join(import.meta.dirname, `../upload/${folder}/${image}`)
        );
      } catch (err) {
        return next(new ErrorHandler("upoald images faild"));
      }
    }
    return next();
  });

export const MultipleCloudHandler = (folder, key) =>
  asynchandler(async (req, res, next) => {
    const images = req.body[key];
    if (images?.length > 0) {
      const uploader = async (file) => CloudImage(file, folder);
      try {
        let newPath = images.map(async (img) => {
          const image = await uploader(
            path.join(import.meta.dirname, `../upload/${folder}/${img}`)
          );
          fs.unlinkSync(
            path.join(import.meta.dirname, `../upload/${folder}/${img}`)
          );
          return image;
        });

        newPath = await Promise.all(newPath);

        req.body[key] = newPath.map((img) => img.url);
      } catch (err) {
        console.log(err);
        return next(new ErrorHandler("upoald images faild"));
      }
    }
    return next();
  });
