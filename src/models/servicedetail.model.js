import mongoose , {Schema} from "mongoose";

const servicedetailSchema = new Schema(
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
    },
    procces : {
        type : String,
        required :true
       },
    keyfutures : [  {
        type : String,
        required :true
       }],
       serviceby : {
        type : Schema.Types.ObjectId,
        ref : 'Service',
         required:true
       }
    },
    {
        timestamps:true
    }
)
export const Servicedetail = mongoose.model("Servicedetail",servicedetailSchema)