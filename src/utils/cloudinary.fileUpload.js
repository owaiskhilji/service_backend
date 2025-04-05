import { v2 as cloudinary } from 'cloudinary';
 import fs from "fs"

// Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUD_API_NAME, 
        api_key:process.env.CLOUD_API_API, 
        api_secret:process.env.CLOUD_API_SECRET
    });
    
    const uploadFileCloudinary = async (uploadfilePath) =>{
        try {

            if (!uploadfilePath) return null
            console.log("uploadfilePath",uploadfilePath)
            const response = await cloudinary.uploader
       .upload(uploadfilePath,{
        resource_type : 'auto'
       })
    //    file has been uploaded
     console.log(`fiile is uploaded ${response}`)
     fs.unlinkSync (uploadfilePath)
    return response
        } catch (error) {
        // return null;          
        try {
      fs.unlinkSync (uploadfilePath)  
          } catch (fsError) {
            console.error("File Deletion Error:", fsError);
          }
      
          return null;



        }
    }

    export { uploadFileCloudinary };


