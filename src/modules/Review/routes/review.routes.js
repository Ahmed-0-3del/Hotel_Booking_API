
import express from  'express'
import { addReviewValidation, updateReviewValidation } from '../validationReview.js'
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from '../controller/review.controller.js'
import { protectRoutes } from '../../auth/auth.controller.js'
import { validation } from '../../../middleware/validation.js'

const reviewRoutes = express.Router()

reviewRoutes.route("/").post(protectRoutes,validation(addReviewValidation),createReview)
reviewRoutes.route("/").get(protectRoutes,getAllReviews)
reviewRoutes.route("/:id").get(protectRoutes,getReviewById)
reviewRoutes.route("/:id").patch(protectRoutes,validation(updateReviewValidation),updateReview)
reviewRoutes.route("/:id").delete(protectRoutes,deleteReview)



export default reviewRoutes ;






