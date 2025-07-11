
import joi from 'joi'


export  const addUserValidation = joi.object({
          name: joi.string().min(3).max(30).required(),
          email: joi.string().email().required(),
          country: joi.string().required(),
          city: joi.string().required(),
          role:joi.string(),
          phone: joi.string().pattern(/^[0-9]+$/).required(),
          password: joi.string().min(6).required(),
          image: joi.string().uri().optional(),
          
})



export  const updateUserValidation = joi.object({
          name: joi.string().min(3).max(30).required(),
          email: joi.string().email().required(),
          country: joi.string().required(),
          city: joi.string().required(),
          role:joi.string(),
          phone: joi.string().pattern(/^[0-9]+$/).required(),
          password: joi.string().min(6).required(),
          image: joi.string().uri().optional(),
}).unknown(true);




