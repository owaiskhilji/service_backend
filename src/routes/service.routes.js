import { Router } from "express"
import {
    serviceController,
    getService,
    editService,
    deleteService
} from "../controllers/service.controller.js"

const router = Router()

router.route("/servicedata").post(serviceController)
router.route("/getservice").get(getService)
router.route("/deleteservice/:id").delete(deleteService);
router.route("/editservice/:id").patch(editService);


export default router