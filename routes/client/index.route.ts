import { Express } from "express"
import { topicRouter } from "./topic.route";
import { songRouter } from "./song.route";
import { SearchRouter } from "./search.route";
export const RouterClient =(app:Express) => {
    app.use("/topics", topicRouter)

    app.use("/songs", songRouter)
    
    app.use("/search", SearchRouter)
}