import { Router} from "express";
import * as controller from "../../controllers/client/topic.controllers";
const router:Router = Router();

router.get("/", controller.topics)

export const topicRouter = router;