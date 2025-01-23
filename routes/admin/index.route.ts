import { Express } from "express";
import { dasboardRouter } from "./dashboard.route";
import { systemConfig } from "../../config/system";
export const RouterAdmin =(app:Express) => {
    const PATH_ADMIN = systemConfig.preFixAdmin;
    app.use(`/${PATH_ADMIN}/dashboard`, dasboardRouter);
}