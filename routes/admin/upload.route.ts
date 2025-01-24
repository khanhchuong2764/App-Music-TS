import { Router} from "express";
import multer from "multer";
const upload = multer();
import * as controller from "../../controllers/admin/upload.controllers";
import { UploadSingel } from "../../middleware/admin/uploadCloud";
const router:Router = Router();

router.post("/",upload.single("file"),UploadSingel,controller.uploadCloud)


export const uploadRouter = router;