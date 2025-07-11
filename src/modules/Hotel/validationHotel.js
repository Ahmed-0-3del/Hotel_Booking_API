
import joi from 'joi'


export  const addHotelValidation = joi.object({
    name:joi.string().required(),
    type:joi.string().required(),
    city:joi.string().required(),
    address:joi.string().required(),
    distance:joi.string().required(),
    title:joi.string().required(),
    desc:joi.string().required(),
    rating:joi.number().min(0).max(5),
    rooms:joi.array().items(joi.string()),
    cheapestPrice:joi.number().required(),
    featured:joi.boolean(),
      stars: joi.number().min(1).max(5),


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



export  const updateHotelValidation = joi.object({
    name:joi.string().required(),
    type:joi.string().required(),
    city:joi.string().required(),
    address:joi.string().required(),
    distance:joi.string().required(),
    title:joi.string().required(),
    desc:joi.string().required(),
    rating:joi.number().min(0).max(5),
    rooms:joi.array().items(joi.string()),
    cheapestPrice:joi.number().required(),
    featured:joi.boolean(),
      stars: joi.number().min(1).max(5),


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




