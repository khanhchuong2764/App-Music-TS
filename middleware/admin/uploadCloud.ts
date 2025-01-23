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

export const UploadMulti = async (req:Request,res:Response,next:NextFunction) => {
    for (const key in req["files"]) {
        req.body[key] = [];
        const arrayfile = req["files"][key];
        for (const item of arrayfile) {
            try {
                let result = await streamUpload(item.buffer);
                req.body[key].push(result["secure_url"]);
            } catch (error) {
                console.log(error);
            }
        }
    }
    next(); 
}