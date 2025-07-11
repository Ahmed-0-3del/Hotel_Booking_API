
import joi from 'joi'


export const signupValidation = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    country: joi.string().required(),
    city: joi.string().required(),
    role:joi.string(),
    phone: joi.string().pattern(/^[0-9]+$/).required(),
    password: joi.string().min(6).required(),
    image: joi.string().uri().optional(),
    })



export const signinValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })












