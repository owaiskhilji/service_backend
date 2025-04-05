import express from "express";
import {apiError} from "./utils/apiError.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express()
 const CORS_ORIGIN = process.env.ORIGIN
app.use(cors({
    origin: CORS_ORIGIN,
    credential:true
}))





app.use(express.json({limit:"16kb"}))
 app.use(express.urlencoded({expended : true , limit:"16kb"})) // expended object me nested object bna ta h 
app.use(express.static("Public"))
app.use(cookieParser())


// Routes import
import projectnameRouter from "./routes/projectname.routes.js"
import projectRouter from "./routes/project.routes.js"
import imageRouter from "./routes/graphicimage.routes.js"
import workRouter from "./routes/work.routes.js"
import offerRouter from "./routes/offer.routes.js"
import serviceRouter from "./routes/service.routes.js"
import servicedetailRouter from "./routes/servicedetail.routes.js"


// ROUTES 


app.use("/api/v1/projectname",projectnameRouter)
app.use("/api/v1/project",projectRouter)
app.use("/api/v1/image",imageRouter)
app.use("/api/v1/work",workRouter)
app.use("/api/v1/offer",offerRouter)
app.use("/api/v1/service",serviceRouter)
app.use("/api/v1/servicedetail",servicedetailRouter)





export { app }