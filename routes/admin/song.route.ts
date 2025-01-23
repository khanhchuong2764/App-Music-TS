import { Router} from "express";
import * as controller from "../../controllers/admin/song.controllers";
import multer from "multer";
import { UploadSingel } from "../../middleware/admin/uploadCloud";
const router:Router = Router();
const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create",upload.single("avatar"),UploadSingel, controller.createPost);

export const SongRouter = router;