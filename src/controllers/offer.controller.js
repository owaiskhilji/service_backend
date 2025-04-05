import mongoose from "mongoose";
import { asyncHendler } from "../utils/asyncHendler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { Offer } from "../models/offer.model.js";




const offerController =  asyncHendler(async (req,res)=>{
     try{
    const {title,percent,description} = req.body
    

const offerCreate = await Offer.create({
    title,
   description,
    percent
})

if(!offerCreate){
    throw new apiError(500,"offer is not found")
}
 await offerCreate.save()
return res
.status(201)
.json(new ApiResponse(200, offerCreate, "offer saved successfully"));

}catch(err){
    console.error("Server Error:", err?.message);    
    throw new apiError(500,"project server error",err)
}
    })

const getOffer = asyncHendler(async(req,res)=>{
    try {
        const {id} = req.params

        console.log("ID",id);
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new apiError(400,"Invalid Id");
            }
        const offer = await Offer.findById({_id:id})
        if (!offer) {
            throw new apiError(404,"offer is not found")
        }

        res.
        status(200).
        json(new ApiResponse(200,
            offer,
            " Offer fetched successfully"))

    } catch (error) {
        console.log("error",error)
        throw new apiError(500,"server error",error?.message)
    }
})





const deleteOffer = asyncHendler(async(req,res)=>{
    try{
        const {id} = req.params
        console.log("ID",id)
        
        
        if(!mongoose.Types.ObjectId.isValid(id)){
throw new apiError(400,"Invalid Id");
}

const existingoffer = await Offer.findById(id);
if (!existingoffer) {
    throw new apiError(404, "offer not found");
}

console.log("existingProject",existingoffer)


const delete_offer = await Offer.findByIdAndDelete(id)

console.log("delete_project",delete_offer)
        if(!delete_offer){
                throw new apiError(404,"offer delete failed");
            }
            
        res.
        status(200).
        json(new ApiResponse(200,
            delete_offer,
            " offer deleted successfully"))
    }catch(error) {
        console.log("Project error",error.message,error)
    }
})




const updateOffer = asyncHendler(async(req,res)=>{
    try{
        const {id} = req.params
        console.log("ID",id)
    
if(!mongoose.Types.ObjectId.isValid(id)){
throw new apiError(400,"Invalid Id");
}
        const { 
             title,
             percent,
            description
                 } = req.body


        const edit_offer = await Offer.findByIdAndUpdate(
            id,
            { 
                title,
                percent,
               description
                    }
            ,{new: true})
            if(!edit_offer){
                throw new apiError(404,"offer update failed");
            }
            
        res.
        status(200).
        json(new ApiResponse(200,
            edit_offer,
            " offer updated successfully"))
    }catch(error) {
        console.log("Project error",error.message,error)
    }
})





export {
offerController ,
updateOffer,
deleteOffer,
getOffer
}