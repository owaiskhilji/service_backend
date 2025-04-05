import mongoose from "mongoose";
import { asyncHendler } from "../utils/asyncHendler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadFileCloudinary } from "../utils/cloudinary.fileUpload.js";
import { apiError } from "../utils/apiError.js";
import { Servicedetail } from "../models/servicedetail.model.js";
import { Service } from "../models/service.model.js";




const servicedetailController =  asyncHendler(async (req,res)=>{
     try{
    const {title,description,procces,keyfutures,serviceby} = req.body
    

const thumbnaillocalPath = req.file?.path
console.log("thumbnaillocalPath",thumbnaillocalPath)

if(!thumbnaillocalPath){
    throw new apiError(404,"thumbnaillocalPath is requird")
}

const thumbnail = await uploadFileCloudinary(thumbnaillocalPath)
console.log("thumbnail",thumbnail)
if(!thumbnail){
    throw new apiError(404,"thumbnail file is requird")
}

const servicedetailCreate = await Servicedetail.create({
    title,
    description,
    procces,
    keyfutures,
    serviceby,
    thumbnail : thumbnail.url
})
console.log("ServicedetailCreate",servicedetailCreate)

if(!servicedetailCreate){
    throw new apiError(500,"Servicedetail is not found")
}

 await servicedetailCreate.save()


 const service = await Service.findById(serviceby);
 if (service) {
   if (!service.services) {
     service.services = [];
   }

   service.services.push(servicedetailCreate._id);
   await service.save();
 } else {
   throw new apiError(404, "Service not found");
 }



return res
.status(201)
.json(new ApiResponse(200, servicedetailCreate, "Servicedetail saved successfully"));

}catch(err){
    console.error("Server Error:", err?.message);    
    throw new apiError(500,"Servicedetail server error",err)
}
    })




const getServicedetail = asyncHendler(async(req,res)=>{
    try {
        const {id} = req.params

        console.log("ID",id);
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new apiError(400,"Invalid Id");
            }
        const servicedetail = await Servicedetail.findById({_id:id})
        if (!servicedetail) {
            throw new apiError(404,"Servicedetail is not found")
        }

        res.
        status(200).
        json(new ApiResponse(200,
            servicedetail,
            " Servicedetail fetched successfully"))

    } catch (error) {
        console.log("error",error)
        throw new apiError(500,"server error",error?.message)
    }
})





const deleteServicedetail = asyncHendler(async(req,res)=>{
    try{
        const {id} = req.params
        console.log("ID",id)
        
        
        if(!mongoose.Types.ObjectId.isValid(id)){
throw new apiError(400,"Invalid Id");
}

const existingServicedetail = await Servicedetail.findById(id);
if (!existingServicedetail) {
    throw new apiError(404, "Servicedetail not found");
}

console.log("existingServicedetail",existingServicedetail)


const delete_Servicedetail = await Servicedetail.findByIdAndDelete(id)

console.log("delete_Servicedetail",delete_Servicedetail)
        if(!delete_Servicedetail){
                throw new apiError(404,"Servicedetail delete failed");
            }
            
        res.
        status(200).
        json(new ApiResponse(200,
            delete_Servicedetail,
            " Servicedetail deleted successfully"))
    }catch(error) {
        console.log("Servicedetail error",error.message,error)
    }
})









const updateServicedetail = asyncHendler(async(req,res)=>{
    try{
        const updatethumbnail = req.file?.path
        const {id} = req.params
        console.log("updatethumbnail",updatethumbnail)
        console.log("ID",id)
        
if(!updatethumbnail){
throw new apiError(400,"updatethumbnail in not provide");
}
if(!mongoose.Types.ObjectId.isValid(id)){
throw new apiError(400,"Invalid Id");
}
        const {  
            title,
            description,
            procces,
            keyfutures
         } = req.body

let thumbnailUrl ;
 if(updatethumbnail){
         const thumbnail = await uploadFileCloudinary(updatethumbnail)
if (!thumbnail.url) {
throw new apiError(404,"thumbanil is required");
}
thumbnailUrl = thumbnail.url
}

const updatedata =  { 
    title,
    description,
    procces,
    keyfutures
}
if(thumbnailUrl){
    updatedata.thumbnail = thumbnailUrl
}


        const edit_Servicedetail = await Servicedetail.findByIdAndUpdate(
            id,
            {
                $set:updatedata
            }
            ,{new: true})
            if(!edit_Servicedetail){
                throw new apiError(404,"Servicedetail update failed");
            }
            
        res.
        status(200).
        json(new ApiResponse(200,
            edit_Servicedetail,
            " Servicedetail updated successfully"))
    }catch(error) {
        console.log("Servicedetail error",error.message,error)
    }
})





export {
servicedetailController ,
updateServicedetail,
deleteServicedetail,
getServicedetail
}