import { Response,Request,NextFunction } from "express";
import { streamUpload } from "../../helpers/streamUpload.helper";


export const UploadSingel = (req:Request,res:Response,next:NextFunction) => {
    if (req["file"]) {
        async function uploadCloudinary(buffer) {
            let result = await streamUpload(buffer);
            req.body[req["file"].fieldname] = result["secure_url"];
            next();
        }
        uploadCloudinary(req["file"].buffer);
    }else {
        next();
    }
} 