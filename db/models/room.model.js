import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true 
    },
    images: {
         type: [String], 
         required:true
    },
    maxpeople:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    roomNumbers:[{Number:Number,unavailableDates:{type: [Date]}}],
    hotel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotel",
        required:true
    }

},
{timestamps:true}
) 
const RoomModel = mongoose.model("Room",roomSchema)

export default RoomModel 






