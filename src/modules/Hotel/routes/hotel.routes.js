
import express from  'express'
import { uploadFileds } from '../../../utils/fileUpload.js'
import { AddHotel, deleteHotel, getAllHotel, gethotelById, gethotelByName, updateHotel } from '../controller/hotel.controller.js'
import { addHotelValidation, updateHotelValidation } from '../validationHotel.js'
import { validation } from '../../../middleware/validation.js'
import { allowTo, protectRoutes } from './../../auth/auth.controller.js';

const hotelRoutes = express.Router()

hotelRoutes.route("/").post(protectRoutes,allowTo("admin"),uploadFileds([{name:"images",maxCount:10}]),validation(addHotelValidation),AddHotel)
hotelRoutes.route("/").get(protectRoutes,getAllHotel)
hotelRoutes.route("/:id").get(protectRoutes,gethotelById)
hotelRoutes.route("/name/:name").get(protectRoutes,gethotelByName)
hotelRoutes.route("/:id").patch(protectRoutes,allowTo("admin"),uploadFileds([{name:"images",maxCount:10}]),validation(updateHotelValidation),updateHotel)
hotelRoutes.route("/:id").delete(protectRoutes,allowTo("admin"),deleteHotel)



export default hotelRoutes ;






