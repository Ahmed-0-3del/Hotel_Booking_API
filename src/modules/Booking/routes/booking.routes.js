
import express from 'express'
import { allowTo, protectRoutes } from '../../auth/auth.controller.js'
import { validation } from '../../../middleware/validation.js'
import { addBookingValidation } from '../validationBooking.js'
import { createBooking, deleteBooking, getAllBookings, getBookingById, getMyBookings, updateBooking } from '../controller/booking.controller.js'



const bookingRoutes = express.Router()

bookingRoutes.route("/").post(protectRoutes,validation(addBookingValidation),createBooking)
bookingRoutes.route("/mybookings").get(protectRoutes,getMyBookings)
bookingRoutes.route("/").get(protectRoutes,allowTo("admin"),getAllBookings)
bookingRoutes.route("/:id").get(protectRoutes,allowTo("admin"),getBookingById)
bookingRoutes.route("/:id").patch(protectRoutes,updateBooking)
bookingRoutes.route("/:id").delete(protectRoutes,deleteBooking)





export default bookingRoutes




