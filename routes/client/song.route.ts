import { Router} from "express";
import * as controller from "../../controllers/client/song.controllers";
const router:Router = Router();

router.get("/:slugTopic", controller.index)

router.get("/detail/:slugSong", controller.detail)

router.patch("/like", controller.like)

router.patch("/favorite", controller.favorite)

export const songRouter = router;