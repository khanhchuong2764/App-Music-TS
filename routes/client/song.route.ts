import { Router} from "express";
import * as controller from "../../controllers/client/song.controllers";
const router:Router = Router();

router.get("/detail/:slugSong", controller.detail)

router.patch("/like", controller.like)

router.patch("/favorite", controller.favorite)

router.get("/favorite", controller.favoriteSong)

router.patch("/listen/:idSong", controller.listen)

router.get("/:slugTopic", controller.index)

export const songRouter = router;