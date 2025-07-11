
import jwt from 'jsonwebtoken'
import { handleError } from './../../middleware/handelErorr.js';
import UserModel from './../../../db/models/user.model.js';
import { AppError } from '../../utils/AppErorr.js';
import bcrypt from'bcrypt'

// signup
export const signup = handleError(
    async(req,res,next)=>{
                const { name, email, password, phone, city, country,role } = req.body;
        // check Email 
            let isFound = await UserModel.findOne({email})
            if(isFound) return next(new AppError("Email already Exist",409))
        // hash password   
            
        // add user
             const user = await UserModel.create({
                        name,
                        email,
                        password,
                        phone,
                        city,
                        country,
                        role
             });
            res.status(201).json({message:"Done",user})
    }
)


// signin
export const signin = handleError(
    async(req,res,next)=>{
        let{email,password}=req.body
        let isFound = await UserModel.findOne({email})
        if(!isFound) return next(new AppError("Email Invalid",401))

        const match = await bcrypt.compare(password,isFound.password)
        console.log("Entered Password:", password);
        console.log("Hashed Password in DB:", isFound.password);
        console.log("Password Match:", match);
        if(!match) return next(new AppError("Password Invalid"),401)

        if(isFound && match ) {
            let token = jwt.sign({name:isFound.name,userId:isFound._id,role:isFound.role},"Ahmed72004")
            return res.status(201).json({message:"Done",token})

        }
        next (new AppError("Email or Password Invalid",401))
    }
)




// 1-check we have token or not
// 2-verfy token 
// 3-if user of this token exist or not 
// 4-check if this token is the last one or not (change password)
export const protectRoutes = handleError(
    async(req,res,next)=>{
        // 1
        let {token} = req.headers
        if(!token) return next(new AppError("Please Provide Token",401))


        // 2
       let decoded = await jwt.verify(token,"Ahmed72004")
 
       // 3
       let user = await UserModel.findById(decoded.userId)
       if(!user) return next(new AppError("user invalid",404))

       if(user.changePasswordAt){
       let changePsswordTime = parseInt(user.changePasswordAt.getTime()/1000)
       if(changePsswordTime > decoded.iat) return next(new AppError("token invalid",401))
       }

       req.user = user
      // 4
        next();

    }
)




export const allowTo = (...roles) => {
    return handleError( async (req, res, next) => {
        if (roles.includes(req.user.role)){
             return next();
        }

        return next(new AppError("not authorized", 401)); 
      }
    );
  };





