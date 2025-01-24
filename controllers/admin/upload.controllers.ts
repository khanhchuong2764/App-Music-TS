import { Request,Response } from "express";

// [GET] /admin/upload/
export const uploadCloud = (req:Request,res:Response) => {
    console.log(req.body.file);
    res.json({
        location: req.body.file
    })
}