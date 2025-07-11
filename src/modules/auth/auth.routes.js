
import express from 'express'
import { signin, signup } from './auth.controller.js'
import { signinValidation, signupValidation } from './authValidation.js'
import { validation } from '../../middleware/validation.js'


const authRoutes = express.Router()
authRoutes.route("/signup").post(validation(signupValidation),signup)
authRoutes.route("/signin").post(validation(signinValidation),signin)


export default authRoutes









