
import mongoose from "mongoose"


export const dbconnection = mongoose.connect("mongodb://127.0.0.1:27017/Hotel_API").then(()=>{
    console.log("DB conected ")
}).catch((error)=>{
    console.log(error)
})






