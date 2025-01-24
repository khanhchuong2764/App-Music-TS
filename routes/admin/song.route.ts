import { Router } from "express";
import * as controller from "../../controllers/admin/song.controllers";
import multer from "multer";
import { UploadMulti } from "../../middleware/admin/uploadCloud";
const router: Router = Router();
const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);


router.post("/create",
    upload.fields(
        [
            { name: 'avatar', maxCount: 1 },
            { name: 'audio', maxCount: 1 }
        ]
    ), UploadMulti, controller.createPost);

router.get("/edit/:idSong", controller.edit);

router.patch("/edit/:idSong",upload.fields(
    [
        { name: 'avatar', maxCount: 1 },
        { name: 'audio', maxCount: 1 }
    ]
), UploadMulti, controller.editPatch);

export const SongRouter = router;