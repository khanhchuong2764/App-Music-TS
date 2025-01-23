import { Request,Response } from "express";

// [GET] /admin/dashboard
export const dashboard = (req:Request,res:Response) => {
    res.render("admin/pages/dashboard/index",{
        titlePage: "Tổng Quan"
    })
}