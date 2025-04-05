import { Router } from "express"
import { upload } from "../middlewares/multer.midderwaer.js";
import {
    imageController ,
 updateImage,
 deleteImage,
getImage
} from "../controllers/graphic.controller.js"

const router = Router()

router.route("/imagedata").post(upload.single('image'),imageController)
 router.route("/getimage/:id").get(getImage)

router.route("/deleteimage/:id").delete(deleteImage);
router.route("/updateimage/:id").patch(upload.single('image'),updateImage);


export default router