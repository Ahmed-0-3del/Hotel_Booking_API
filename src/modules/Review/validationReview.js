
import Joi from "joi";

export const addReviewValidation = Joi.object({
  rating: Joi.number().min(1).max(5).required().messages({
    "number.base": "Rating must be a number",
    "number.min": "Rating must be at least 1",
    "number.max": "Rating must not exceed 5",
    "any.required": "Rating is required",
  }),
  comment: Joi.string().min(3).max(500).optional().allow("").messages({
    "string.base": "Comment must be a string",
    "string.min": "Comment must be at least 3 characters",
    "string.max": "Comment must not exceed 500 characters",
  }),
  hotel: Joi.string().required().messages({
    "string.base": "Hotel ID must be a string",
    "any.required": "Hotel ID is required",
  }),
});


export const updateReviewValidation = Joi.object({
  rating: Joi.number().min(1).max(5).optional(),
  comment: Joi.string().min(3).max(500).optional().allow(""),
}).unknown(true);

