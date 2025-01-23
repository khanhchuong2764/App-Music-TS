import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret
});

export const streamUpload = (buffer:Buffer) => {
  return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream({resource_type: "auto"},
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
