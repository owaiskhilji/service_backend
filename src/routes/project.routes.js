import { Router } from "express"
import { upload } from "../middlewares/multer.midderwaer.js";
import {
    projectController,
    updateProject,
    deleteProject,
    getProject
} from "../controllers/project.controller.js"

const router = Router()

router.route("/projectdata").post(upload.single('thumbnail'),projectController)
 router.route("/getproject/:id").get(getProject)

router.route("/deleteproject/:id").delete(deleteProject);
router.route("/updateproject/:id").patch(upload.single('thumbnail'),updateProject);


export default router