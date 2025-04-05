import mongoose from "mongoose";
import { asyncHendler } from "../utils/asyncHendler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadFileCloudinary } from "../utils/cloudinary.fileUpload.js";
import { apiError } from "../utils/apiError.js";
import { Project } from "../models/project.model.js";
import { Projectname } from "../models/projectname.model.js";




const projectController =  asyncHendler(async (req,res)=>{
     try{
    const {title,videolink,deploylink,projectby} = req.body
    

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

const projectCreate = await Project.create({
    title,
    videolink,
    deploylink,
    projectby,
    thumbnail : thumbnail.url
})
console.log("projectCreate",projectCreate)

if(!projectCreate){
    throw new apiError(500,"project is not find")
}

 await projectCreate.save()


 const projectname = await Projectname.findById(projectby);
 if (projectname) {
     projectname.projects.push(projectCreate._id);
     await projectname.save();
 }



return res
.status(201)
.json(new ApiResponse(200, projectCreate, "project saved successfully"));

}catch(err){
    console.error("Server Error:", err?.message);    
    throw new apiError(500,"project server error",err)
}
    })

const getProject = asyncHendler(async(req,res)=>{
    try {
        const {id} = req.params

        console.log("ID",id);
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new apiError(400,"Invalid Id");
            }
        const project = await Project.findById({_id:id})
        if (!project) {
            throw new apiError(404,"project is not found")
        }

        res.
        status(200).
        json(new ApiResponse(200,
            project,
            " Project fetched successfully"))

    } catch (error) {
        console.log("error",error)
        throw new apiError(500,"server error",error?.message)
    }
})





const deleteProject = asyncHendler(async(req,res)=>{
    try{
        const {id} = req.params
        console.log("ID",id)
        
        
        if(!mongoose.Types.ObjectId.isValid(id)){
throw new apiError(400,"Invalid Id");
}

const existingProject = await Project.findById(id);
if (!existingProject) {
    throw new apiError(404, "Project not found");
}

console.log("existingProject",existingProject)


const delete_project = await Project.findByIdAndDelete(id)

console.log("delete_project",delete_project)
        if(!delete_project){
                throw new apiError(404,"Project delete failed");
            }
            
        res.
        status(200).
        json(new ApiResponse(200,
            delete_project,
            " Project deleted successfully"))
    }catch(error) {
        console.log("Project error",error.message,error)
    }
})









const updateProject = asyncHendler(async(req,res)=>{
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
        const {  title,
            videolink,
            deploylink,
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
    videolink,
    deploylink,
}
if(thumbnailUrl){
    updatedata.thumbnail = thumbnailUrl
}


        const edit_project = await Project.findByIdAndUpdate(
            id,
            {
                $set:updatedata
            }
            ,{new: true})
            if(!edit_project){
                throw new apiError(404,"Project update failed");
            }
            
        res.
        status(200).
        json(new ApiResponse(200,
            edit_project,
            " Project updated successfully"))
    }catch(error) {
        console.log("Project error",error.message,error)
    }
})





export{
projectController ,
updateProject,
deleteProject,
getProject
}