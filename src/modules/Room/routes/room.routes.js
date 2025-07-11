
import express from  'express'
import { uploadFileds } from '../../../utils/fileUpload.js'
import { addRoomValidation, updateRoomValidation } from '../validationRoom.js'
import { validation } from '../../../middleware/validation.js'
import { allowTo, protectRoutes } from '../../auth/auth.controller.js';
import { AddRoom, deleteRoom, getAllRoom, getRoomById, getRoomByName, updateRoom } from '../controller/room.controller.js'

const roomRoutes = express.Router()

roomRoutes.route("/").post(protectRoutes,allowTo("admin"),uploadFileds([{name:"images",maxCount:10}]),validation(addRoomValidation),AddRoom)
roomRoutes.route("/").get(protectRoutes,getAllRoom)
roomRoutes.route("/:id").get(protectRoutes,getRoomById)
roomRoutes.route("/title/:title").get(protectRoutes,getRoomByName)
roomRoutes.route("/:id").patch(protectRoutes,allowTo("admin"),uploadFileds([{name:"images",maxCount:10}]),validation(updateRoomValidation),updateRoom)
roomRoutes.route("/:id").delete(protectRoutes,allowTo("admin"),deleteRoom)



export default roomRoutes ;






