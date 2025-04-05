import mongoose from "mongoose";
import { asyncHendler } from "../utils/asyncHendler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadFileCloudinary } from "../utils/cloudinary.fileUpload.js";
import { apiError } from "../utils/apiError.js";
import { Work } from "../models/work.model.js";




const workController =  asyncHendler(async (req,res)=>{
     try{
    const {title,description} = req.body
    

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

const workCreate = await Work.create({
    title,
   description,
    thumbnail : thumbnail.url
})
console.log("projectCreate",workCreate)

if(!workCreate){
    throw new apiError(500,"work is not found")
}
 await workCreate.save()
return res
.status(201)
.json(new ApiResponse(200, workCreate, "work saved successfully"));

}catch(err){
    console.error("Server Error:", err?.message);    
    throw new apiError(500,"project server error",err)
}
    })

const getWork = asyncHendler(async(req,res)=>{
    try {
        const {id} = req.params

        console.log("ID",id);
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new apiError(400,"Invalid Id");
            }
        const work = await Work.findById({_id:id})
        if (!work) {
            throw new apiError(404,"work is not found")
        }

        res.
        status(200).
        json(new ApiResponse(200,
            work,
            " Project fetched successfully"))

    } catch (error) {
        console.log("error",error)
        throw new apiError(500,"server error",error?.message)
    }
})





const deleteWork = asyncHendler(async(req,res)=>{
    try{
        const {id} = req.params
        console.log("ID",id)
        
        
        if(!mongoose.Types.ObjectId.isValid(id)){
throw new apiError(400,"Invalid Id");
}

const existingWork = await Work.findById(id);
if (!existingWork) {
    throw new apiError(404, "Work not found");
}

console.log("existingProject",existingWork)


const delete_work = await Work.findByIdAndDelete(id)

console.log("delete_project",delete_work)
        if(!delete_work){
                throw new apiError(404,"work delete failed");
            }
            
        res.
        status(200).
        json(new ApiResponse(200,
            delete_work,
            " work deleted successfully"))
    }catch(error) {
        console.log("Project error",error.message,error)
    }
})




const updateWork = asyncHendler(async(req,res)=>{
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
            description
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
     title,description
}
if(thumbnailUrl){
    updatedata.thumbnail = thumbnailUrl
}


        const edit_work = await Work.findByIdAndUpdate(
            id,
            {
                $set:updatedata
            }
            ,{new: true})
            if(!edit_work){
                throw new apiError(404,"Work update failed");
            }
            
        res.
        status(200).
        json(new ApiResponse(200,
            edit_work,
            " work updated successfully"))
    }catch(error) {
        console.log("Project error",error.message,error)
    }
})





export {
workController ,
updateWork,
deleteWork,
getWork
}