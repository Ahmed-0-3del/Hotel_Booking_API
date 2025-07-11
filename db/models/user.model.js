import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    country:{
        type:String,
        required:true 
    },
    image:{
        type:String
    },
    city:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    changePasswordAt:Date,
    isVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    },
    resetToken:{
        type: String,
    },
    resetTokenExpiry:{
          type: Date,
    },
    bookings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Booking"
        }
    ]

},
{timestamps:true}
)

userSchema.pre("save", function () {
  if (this.isModified("password") || this.isNew) {
    // تأكد من أن كلمة المرور موجودة قبل التشفير
    if (!this.password) throw new Error("Password is required");
    this.password = bcrypt.hashSync(this.password, 10); // 10 هو عدد الـ salt rounds
  }
});

// عند تحديث كلمة المرور باستخدام findOneAndUpdate
userSchema.pre("findOneAndUpdate", function () {
  if (this._update.password) {
    // تأكد من وجود كلمة مرور لتشفيرها
    this._update.password = bcrypt.hashSync(this._update.password, 10);
  }
});

const UserModel = mongoose.model("User",userSchema)
export default UserModel



