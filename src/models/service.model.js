import mongoose ,{Schema} from "mongoose";

const serviceSchema = new Schema(
    {
        service:{
            type : String,
            required : true,
            unique : true,
            lowercase : true,
        },
        services : [
            {
                type : Schema.Types.ObjectId,
                ref : "Servicedetail"
            }
        ]

    }
,{timestamps:true})


export const Service = mongoose.model("Service",serviceSchema)
 

