
import mongoose from "mongoose"
import multer from "multer";
import { AppError } from "./AppErorr.js";

const uploadFile = ()=>{

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
          cb(null,new mongoose.Types.ObjectId +'_'+ file.originalname)
        }
      });

      function fileFilter (req, file, cb) {

        if(file.mimetype.startsWith("image")){
             cb(null, true)
        }else{
            cb(new AppError("invalid images type",401), false)
        }
      
      }
      
      const upload = multer({ storage: storage,fileFilter })

      return upload ;
}

export const uploadSignle = (filedName) => uploadFile().single(filedName);
export const uploadArray = (filedName) => uploadFile().array(filedName,10);
export const uploadFileds = (filedName) => uploadFile().fields(filedName);







