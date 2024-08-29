import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dk4ru8nmy",
  api_key: 888495156375993,
  api_secret: "MSU2r1pUxcBvzHkpIX1--o0XSl8",
});

export const CloudImage = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(file, { folder, resource_type: "auto" })
      .then((res) => {
        resolve({
          url: res.url,
          id: res.public_id,
        });
      })
      .catch((err) => reject(err));
  });
};
