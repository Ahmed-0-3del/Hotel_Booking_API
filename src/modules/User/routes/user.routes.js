
import express from  'express'
import { validation } from '../../../middleware/validation.js'
import { addUserValidation } from '../validationUser.js';
import { AddUser, changePssword, deleteUser, getAllUser, getUserById, updateUser } from '../controller/user.controller.js';
import { allowTo, protectRoutes } from '../../auth/auth.controller.js';

const userRoutes = express.Router()

userRoutes.route("/").post(protectRoutes,allowTo("admin"),validation(addUserValidation),AddUser)
userRoutes.route("/").get(protectRoutes,allowTo("admin"),getAllUser)
userRoutes.route("/:id").get(protectRoutes,allowTo("admin"),getUserById)
userRoutes.route("/:id").patch(protectRoutes,allowTo("admin","user"),updateUser)
userRoutes.route("/:id").delete(protectRoutes,allowTo("admin"),deleteUser)
userRoutes.route("/changepassword/:id").put(protectRoutes,allowTo("admin","user"),changePssword)




export default userRoutes ;






