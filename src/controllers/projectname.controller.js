import mongoose from "mongoose";
import { asyncHendler } from "../utils/asyncHendler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { Projectname } from "../models/projectname.model.js";




const projectnameController =  asyncHendler(async (req,res)=>{
     try{
    const {projectname} = req.body
    
const projectnameCreate = await Projectname.create({
    projectname
})
console.log("menuCreate",projectnameCreate)

if(!projectnameCreate){
    throw new apiError(500,"menu is not find")
}
 await projectnameCreate.save()
return res
.status(201)
.json(new ApiResponse(200, projectnameCreate, "project name saved successfully"));

}catch(err){
    console.error("project name Server Error:", err);    
    throw new apiError(500,"project name server error",err)
}
    })


    
    
    const getProjectname = asyncHendler(async(_,res)=>{
     try{
        const project = await Projectname.find().sort({createdAt:-1}).limit(1)
        if(!project){
            throw new apiError(400,"project is not found")
        }   return res
             .status(201)
             .json(new ApiResponse(200, project, "menu fetching successfully"))
     }catch(err){
        throw new apiError(500,"get err",err?.message)
     }
})

     


const deleteproject = asyncHendler(async(req,res) =>{
    try {
        const { id } = req.params
        
          const deleteproject = await Projectname.findByIdAndDelete(id)
            if(!deleteproject){
                throw new apiError(404,"deleteproject deleted failed");
            }
        res.
        status(200).
        json(new ApiResponse(200,
            deleteproject
            ," Projectname Deleted"
        ))
    } catch (error) {
        console.log("Delete error",error)
        res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, null, "Error deleting create", error));

    }
    })
     



        
    const editproject = asyncHendler(async(req,res) =>{
        try {
            const { id } = req.params
            console.log("ID",id)
            
if(!mongoose.Types.ObjectId.isValid(id)){
    throw new apiError(400,"Id in not defined");
}
            const {projectname} = req.body
            const edit_projectname = await Projectname.findByIdAndUpdate(
                id,
                {projectname} 
                ,{new: true})
                if(!edit_projectname){
                    throw new apiError(404,"Edit ProjectName is not editted");
                }
                
            res.
            status(200).
            json(new ApiResponse(200,
                edit_projectname,
                " Project name editted successfully"))
        } catch (error) {
            console.log("Project name error",error.message,error)
        }
        })
    


    export {
        projectnameController,
        getProjectname,
        editproject,
        deleteproject
    }