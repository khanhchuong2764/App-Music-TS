import { Router} from "express";
import * as controller from "../../controllers/admin/song.controllers";
const router:Router = Router();

router.get("/", controller.index);

router.get("/create", controller.create);


export const SongRouter = router;