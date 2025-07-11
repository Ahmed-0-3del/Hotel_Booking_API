import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    hotel:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Hotel"
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},
{timestamps:true}
)

reviewSchema.pre(/^find/, function () {
  this.populate("user", "username"); // حسب الحقول اللي في user
});

const ReviewModel = mongoose.model("Review",reviewSchema)
export default ReviewModel
 


