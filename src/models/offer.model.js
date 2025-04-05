import mongoose , {Schema} from "mongoose";


const offerSchema = new Schema(
    {
    title : {
        type :String,
        required : true
       },
       percent : {
        type : String,
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

export const Offer = mongoose.model("Offer",offerSchema)