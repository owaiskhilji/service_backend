import { Router } from "express"
import { upload } from "../middlewares/multer.midderwaer.js";
import {
    servicedetailController ,
    updateServicedetail,
    deleteServicedetail,
    getServicedetail
    } from "../controllers/servicedetail.controller.js"

const router = Router()

router.route("/servicedetaildata").post(upload.single('thumbnail'),servicedetailController)
 router.route("/getservicedetail/:id").get(getServicedetail)

router.route("/deleteservicedetail/:id").delete(deleteServicedetail);
router.route("/updateservicedetail/:id").patch(upload.single('thumbnail'),updateServicedetail);


export default router