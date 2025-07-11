
import joi from 'joi'


export  const addRoomValidation = joi.object({
   title: joi.string().min(3).max(50).required(),
  price: joi.number().min(0).required(),
  maxpeople: joi.number().min(1).required(),
  desc: joi.string().min(10).max(500).required(),
  hotel: joi.string().length(24).required(),
  roomNumbers: joi.array().items(joi.object({
         number: joi.number().required(),
        unavailableDates: joi.array().items(joi.date()).default([]),
  })),

    images:joi.array().items(joi.object({
            fieldname:joi.string().required(),
           originalname:joi.string().required(),
            encoding:joi.string().required(),
           mimetype:joi.string().valid('image/jpeg','image/png','image/jpg').required(),
           destination:joi.string().required(),
            filename:joi.string().required(),
           path: joi.string().required(),
           size:joi.number().max(5242880).required()
        }).required()).required()
})



export  const updateRoomValidation = joi.object({
    
   title: joi.string().min(3).max(50).required(),
  price: joi.number().min(0).required(),
  maxpeople: joi.number().min(1).required(),
  desc: joi.string().min(10).max(500).required(),
  hotel: joi.string().length(24).required(),
  roomNumbers: joi.array().items(joi.object({
         number: joi.number().required(),
        unavailableDates: joi.array().items(joi.date()).default([]),
  })),

    images:joi.array().items(joi.object({
            fieldname:joi.string().required(),
           originalname:joi.string().required(),
            encoding:joi.string().required(),
           mimetype:joi.string().valid('image/jpeg','image/png','image/jpg').required(),
           destination:joi.string().required(),
            filename:joi.string().required(),
           path: joi.string().required(),
           size:joi.number().max(5242880).required()
        }).required()).required()
}).unknown(true);




