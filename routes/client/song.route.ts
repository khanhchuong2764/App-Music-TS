import { Router} from "express";
import * as controller from "../../controllers/client/song.controllers";
const router:Router = Router();

router.get("/:slugTopic", controller.index)

router.get("/detail/:slugSong", controller.detail)

export const songRouter = router;