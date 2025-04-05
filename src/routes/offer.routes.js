import { Router } from "express"
import  {
    offerController ,
updateOffer,
deleteOffer,
getOffer
    } from "../controllers/offer.controller.js"

const router = Router()

router.route("/offerdata").post(offerController)
 router.route("/getoffer/:id").get(getOffer)

router.route("/deleteoffer/:id").delete(deleteOffer);
router.route("/updateoffer/:id").patch(updateOffer);


export default router