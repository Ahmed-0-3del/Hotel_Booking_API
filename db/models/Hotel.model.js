
import mongoose from "mongoose";

const hotelschema = new mongoose.Schema({
      name:{
        type:String,
        required:true
      },
      type:{
        type:String,
        required:true
      },
      city:{
        type:String,
        required:true
      },
      address:{
        type:String,
        required:true
      },
      distance:{
        type:String,
        required:true
      },
      images:{
        type:[String],
        required:true
      },
      title:{
        type:String,
        required:true
      },
      desc:{
        type:String,
        required:true 
      },
      rating:{
        type:Number,
        min:0,
        max:5
      },
      rooms:{
        type:[String]
      },
     cheapestPrice:{
        type: Number,
        required: true,
     },
     featured:{
        type: Boolean,
         default: false,
       },
    stars:{
        type:Number,
        min:1,
        max:5
    },
    amenities: {
            type: [String],
    },
    roomCount:{
        type:Number,
        default:0
    },
    cancellationPolicy: {
      type: String,
    },


})

hotelschema.post("init", function (doc) {
  if (Array.isArray(doc.images)) {
    doc.images = doc.images.map(image => {
      return `${process.env.BASE_URL}uploads/${image}`;
    });
  }
});
const HotelModel = mongoose.model("Hotel",hotelschema)
export default HotelModel









