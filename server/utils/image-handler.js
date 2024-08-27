import fs from "fs";
import path from "path";
import sharp from "sharp";

export const deleteImage =  (filename) => {
  try {
    fs.unlinkSync(
      path.join(import.meta.dirname, "../upload/" + filename)
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const saveImage = (buffer, file_name, option) => {
  sharp(buffer)
    .toFormat("png")
    .toFile(path.join(import.meta.dirname, `../upload/${option}/${file_name}`));
};
