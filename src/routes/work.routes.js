import { Router } from "express"
import { upload } from "../middlewares/multer.midderwaer.js";
import  {
    workController ,
    updateWork,
    deleteWork,
    getWork
    } from "../controllers/work.controller.js"

const router = Router()

router.route("/workdata").post(upload.single('thumbnail'),workController)
 router.route("/getwork/:id").get(getWork)

router.route("/deletework/:id").delete(deleteWork);
router.route("/updatework/:id").patch(upload.single('thumbnail'),updateWork);


export default router