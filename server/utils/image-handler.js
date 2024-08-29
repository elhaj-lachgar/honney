import path from "path";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";

export const deleteImage = async (filename) => {
  try {
    await cloudinary.api
      .delete_resources(filename, { type: "upload", resource_type: "image" })
      .catch((error) => new Error(error));
  } catch (error) {
    throw new Error(error);
  }
};

export const saveImage = (buffer, file_name, option) => {
  sharp(buffer)
    .toFormat("png")
    .toFile(path.join(import.meta.dirname, `../upload/${option}/${file_name}`));
};
