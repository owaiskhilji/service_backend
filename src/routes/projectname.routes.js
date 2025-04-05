import { Router } from "express"
import {
    projectnameController,
    getProjectname,
    editproject,
    deleteproject
} from "../controllers/projectname.controller.js"

const router = Router()

router.route("/projectnamedata").post(projectnameController)
router.route("/getprojectname").get(getProjectname)
router.route("/deleteprojectname/:id").delete(deleteproject);
router.route("/editprojectname/:id").patch(editproject);


export default router