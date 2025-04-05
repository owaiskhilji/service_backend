import mongoose ,{Schema} from "mongoose";

const projectnameSchema = new Schema(
    {
        projectname:{
            type : String,
            required : true,
            unique : true,
            lowercase : true,
        },
        projects : [
            {
                type : Schema.Types.ObjectId,
                ref : "Project"
            }
        ],
        graphicProject : [
            {
                type : Schema.Types.ObjectId,
                ref : "Graphicdesgin"
            }
        ]

    }
,{timestamps:true})


export const Projectname = mongoose.model("Projectname",projectnameSchema)
 

