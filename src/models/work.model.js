import mongoose , {Schema} from "mongoose";


const workSchema = new Schema(
    {
    title : {
        type :String,
        required : true
       },
       thumbnail : {
        type : String,//cloudnari store
        required :true
       },
       description : {
        type : String,
        required :true
       }
    },
    {
        timestamps:true
    }
)

export const Work = mongoose.model("Work",workSchema)