
import ApiFeatuer from '../../../utils/APifuter.js';
import { handleError } from '../../../middleware/handelErorr.js';
import UserModel from './../../../../db/models/user.model.js';
import { AppError } from '../../../utils/AppErorr.js';




// Add User
const AddUser= handleError(
  async (req, res, next) => {
        
     let user = await UserModel.findOne({email:req.body.email})
     if(user) return next(new AppError("Email Alerady Exist",401))
   
     let preUser = new UserModel(req.body)
     let addUser = await preUser.save()
    
    res.status(201).json({ message: "Added", addUser });
  }
);



// Get All
const getAllUser = handleError(
    async(req,res,next)=>{
            let apiFeatuer = new ApiFeatuer(UserModel.find(),req.query).pagination().filter().sort().search().fields()
            let allUser= await apiFeatuer.mongooseQuery
            res.status(200).json({message:"All User",page:apiFeatuer.page,allUser})
    }
)

// Get Uaser By Id
const getUserById = handleError(
      async(req,res,next)=>{
        let getUserById = await UserModel.findById(req.params.id)
        res.status(201).json({message:"Done",getUserById})
      }
)




// Update User
const updateUser = handleError(
 async(req,res,next)=>{

  // لو اليوزر role = user، لازم يتأكد إنه بيعدل حسابه هو
    if (req.user.role === "user" && req.user._id.toString() !== req.params.id) {
      return next(new AppError("You are not allowed to update this account", 403));
    }

       let user = await UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
       if(!user) return next(new AppError("User Not Found",404))
        res.status(200).json({message:"Done",user})
 }
);


// Delet User
const deleteUser = handleError(
    async(req,res,next)=>{
        let user = await UserModel.findByIdAndDelete(req.params.id)
        user && res.status(201).json({message:"Done",user})
        !user && res.status(400).json({message:"Not Found User"})
    }
)


//Change Password
const changePssword= async (req,res,next) =>{

    // Check permission: only account owner or admin can change password
    if (req.user.role === "user" && req.user._id.toString() !== req.params.id) {
      return next(new AppError("Not authorized", 403));
    }
    req.body.changePsswordAt = Date.now();
    let result = await UserModel.findOneAndUpdate({ _id: req.params.id },req.body, { new: true });
    !result && next(new AppError("not Found User",404))
     result && res.json({message:"Done ",result})
}






export{
    AddUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
    changePssword
}