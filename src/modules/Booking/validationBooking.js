import Joi from "joi";
import mongoose from "mongoose";

export const addBookingValidation = Joi.object({
  user: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .optional(), // لأنه لو اليوزر بيحجز نفسه مش لازم يبعت الـ id

  hotel: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }),

  room: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }),

  startDate: Joi.date().required(),
   endDate: Joi.date().greater(Joi.ref('startDate')).required().messages({
    'date.greater': '"endDate" must be after "startDate"',
  }),
   totalGuests:Joi.number().required(),
  paymentMethod: Joi.string().valid("cash", "card").default("cash"),

  status: Joi.string().valid("pending", "confirmed", "cancelled").optional(),
});




















