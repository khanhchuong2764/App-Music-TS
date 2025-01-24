import { Express } from "express";
import { dasboardRouter } from "./dashboard.route";
import { systemConfig } from "../../config/system";
import { topicRouter } from "./topic.route";
import { SongRouter } from "./song.route";
import { uploadRouter } from "./upload.route";
export const RouterAdmin =(app:Express) => {
    const path = systemConfig.preFixAdmin;
    app.use(`/${path}/dashboard`, dasboardRouter);

    app.use(`/${path}/topics`, topicRouter);

    app.use(`/${path}/songs`, SongRouter);

    app.use(`/${path}/upload`, uploadRouter);
}