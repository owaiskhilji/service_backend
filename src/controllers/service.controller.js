import mongoose from "mongoose";
import { asyncHendler } from "../utils/asyncHendler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { Service } from "../models/service.model.js";




const serviceController =  asyncHendler(async (req,res)=>{
     try{
    const {service} = req.body
    
const serviceCreate = await Service.create({
    service
})
console.log("menuCreate",serviceCreate)

if(!serviceCreate){
    throw new apiError(500,"Service is not find")
}
 await serviceCreate.save()
return res
.status(201)
.json(new ApiResponse(200, serviceCreate, "Service saved successfully"));

}catch(err){
    console.error("service name Server Error:", err);    
    throw new apiError(500,"service name server error",err)
}
    })


    
    
    const getService = asyncHendler(async(_,res)=>{
     try{
        const service = await Service.find().sort({createdAt:-1}).limit(1)
        if(!service){
            throw new apiError(400,"service is not found")
        }   return res
             .status(201)
             .json(new ApiResponse(200, service, "Service fetched successfully"))
     }catch(err){
        throw new apiError(500,"get err",err?.message)
     }
})

     


const deleteService = asyncHendler(async(req,res) =>{
    try {
        const { id } = req.params
        
          const deleteservice = await Service.findByIdAndDelete(id)
            if(!deleteservice){
                throw new apiError(404,"deleteservice deleted failed");
            }
        res.
        status(200).
        json(new ApiResponse(200,
            deleteservice
            ," Service Deleted"
        ))
    } catch (error) {
        console.log("Delete error",error)
        res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, null, "Error deleting create", error));

    }
    })
     



        
    const editService = asyncHendler(async(req,res) =>{
        try {
            const { id } = req.params
            console.log("ID",id)
            
if(!mongoose.Types.ObjectId.isValid(id)){
    throw new apiError(400,"Id in not defined");
}
            const {service} = req.body
            const edit_service = await Service.findByIdAndUpdate(
                id,
                {service} 
                ,{new: true})
                if(!edit_service){
                    throw new apiError(404,"Edit Service is not editted");
                }
                
            res.
            status(200).
            json(new ApiResponse(200,
                edit_service,
                " service name editted successfully"))
        } catch (error) {
            console.log("service name error",error.message,error)
        }
        })
    


    export {
        serviceController,
        getService,
        editService,
        deleteService
    }