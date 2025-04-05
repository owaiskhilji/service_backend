import mongoose from "mongoose";
import { asyncHendler } from "../utils/asyncHendler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadFileCloudinary } from "../utils/cloudinary.fileUpload.js";
import { apiError } from "../utils/apiError.js";
import { Graphicdesgin } from "../models/graphic.model.js";




const imageController =  asyncHendler(async (req,res)=>{
     try{

const imagelocalPath = req.file?.path
console.log("imagelocalPath",imagelocalPath)

if(!imagelocalPath){
    throw new apiError(404,"imagelocalPath is requird")
}

const image = await uploadFileCloudinary(imagelocalPath)
console.log("image",image)
if(!image){
    throw new apiError(404,"image file is requird")
}

const imageCreate = await Graphicdesgin.create({
    image : image.url
})
console.log("imageCreate",imageCreate)

if(!imageCreate){
    throw new apiError(500,"image is not find")
}
 await imageCreate.save()
return res
.status(201)
.json(new ApiResponse(200, imageCreate, "image saved successfully"));

}catch(err){
    console.error("Server Error:", err?.message);    
    throw new apiError(500,"image server error",err)
}
    })

const getImage = asyncHendler(async(req,res)=>{
    try {
        const {id} = req.params

        console.log("ID",id);
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new apiError(400,"Invalid Id");
            }
        const image = await Graphicdesgin.findById({_id:id})
        if (!image) {
            throw new apiError(404,"image is not found")
        }

        res.
        status(200).
        json(new ApiResponse(200,
            image,
            " image fetched successfully"))

    } catch (error) {
        console.log("error",error)
        throw new apiError(500,"server error",error?.message)
    }
})





const deleteImage = asyncHendler(async(req,res)=>{
    try{
        const {id} = req.params
        console.log("ID",id)
        
        
        if(!mongoose.Types.ObjectId.isValid(id)){
throw new apiError(400,"Invalid Id");
}




const delete_graphicdesgin = await Graphicdesgin.findByIdAndDelete(id)

console.log("delete_graphicdesgin",delete_graphicdesgin)
        if(!delete_graphicdesgin){
                throw new apiError(404,"graphic image delete failed");
            }
            
        res.
        status(200).
        json(new ApiResponse(200,
            delete_graphicdesgin,
            " graphic desgin image deleted successfully"))
    }catch(error) {
        console.log("Project error",error.message,error)
    }
})









const updateImage =asyncHendler(async(req,res)=>{
  const updateImage=req.file?.path

const { id } = req.params

const getimage = await Graphicdesgin.findById(id)
if (!getimage) {
    throw new apiError(404,"image is not found")
}

console.log("image",getimage)



    console.log("updateImage",updateImage)
  if(!updateImage){
    throw new apiError(401,"invalid updateImage")
    }


    const graphicDesginImage = await uploadFileCloudinary(updateImage)
    
    if(!graphicDesginImage.url){
      throw new apiError(401,"while updating on image")
      }
  
    const image =await Graphicdesgin.findByIdAndUpdate(
      id,
      {
        $set:{
            image:graphicDesginImage.url
        }
      },
      {new:true}
    )

    return res 
  .status(200)
  .json(
    new ApiResponse(200
    ,
    image
    ,
    "image updated successfully"
  )
  )
  })





export {
    imageController ,
 updateImage,
 deleteImage,
getImage
}