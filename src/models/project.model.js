import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; 
const projectSchema = new Schema(
    {
    title : {
        type :String,
        required : true
       },
       thumbnail : {
        type : String,//cloudnari store
        required :true
       },
       deploylink : {
        type : String,
       },
       videolink : {
        type : String,
       },
       projectby : {
        type : Schema.Types.ObjectId,
        ref : 'Projectname',
         required:true
       }
    },
    {
        timestamps:true
    }
)
projectSchema.plugin(mongooseAggregatePaginate)
export const Project = mongoose.model("Project",projectSchema)