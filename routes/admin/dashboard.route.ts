import { Router} from "express";
import * as controller from "../../controllers/admin/dasboard.controllers";
const router:Router = Router();

router.get("/", controller.dashboard)


export const dasboardRouter = router;