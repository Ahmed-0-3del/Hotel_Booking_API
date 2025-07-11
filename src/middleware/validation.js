import { AppError } from "../utils/AppErorr.js"

export const validation = (schema) =>{
    return(req,res,next)=>{

     let filters = {};
      if(req.file){
          filters = {image: req.file , ...req.body,...req.params,...req.query }
      }else if(req.files && req.files.images){
        filters= {images:req.files.images,...req.body,...req.params,...req.query}
      }else{
        filters= {...req.body,...req.params,...req.query}
      }

      let {error} = schema.validate( filters ,{aboartEarly:false})
      if(!error){
        next();
      }else{
        let errorList = [];
        error.details.forEach(element => {
          errorList.push(element.message)
        });
        next(new AppError(errorList,401))
      }
    }
}

