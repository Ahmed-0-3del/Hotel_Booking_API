
import ApiFeatuer from '../../../utils/APifuter.js';
import {  addRoomValidation, updateRoomValidation} from '../validationRoom.js';
import { handleError } from '../../../middleware/handelErorr.js';
import RoomModel from '../../../../db/models/room.model.js';




// Add Room
const AddRoom = handleError(
  async (req, res, next) => {
        req.body.images = req.files.images;

    const { error } = addRoomValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details?.[0]?.message || "Validation failed",
      });
    }

    if (!req.files || !req.files.images) {
      return res.status(400).json({ message: "Images are required" });
    }

    req.body.images = req.files.images.map((ele) => ele.filename);

    const newRoom = new RoomModel(req.body);
    let addRoom= await newRoom.save();

    res.status(201).json({ message: "Added", addRoom });
  }
);



// Get All
const getAllRoom = handleError(
    async(req,res,next)=>{
            let apiFeatuer = new ApiFeatuer(RoomModel.find(),req.query).pagination().filter().sort().search().fields()
            let allRoom= await apiFeatuer.mongooseQuery
            res.status(200).json({message:"All Room",page:apiFeatuer.page,allRoom})
    }
)

// Get Room By Id
const getRoomById = handleError(
      async(req,res,next)=>{
        let getRoomById = await RoomModel.findById(req.params.id)
        res.status(201).json({message:"Done",getRoomById})
      }
)


// Get Room By Name
const getRoomByName = handleError(
      async(req,res,next)=>{
        const {title} = req.params
        let roomByName = await RoomModel.findOne({title})

        if(!roomByName){
            return res.status(404).json({message:"Room Not Found"})
        } else{
          res.status(201).json({message:"Done",roomByName})
        }
      }
)


// Update Room
const updateRoom = handleError(
  async (req, res, next) => {
    //  التحقق لازم يتم قبل أي تعديل في الصور
    const { error } = updateRoomValidation.validate({
      ...req.body,
      images: req.files.images // الصور لسه objects زي multer
    });

    if (error) {
      return res.status(400).json({
        message: error.details?.[0]?.message || "Validation failed",
      });
    }

    //  بعد التحقق نحول الصور إلى أسماء فقط
    if (!req.files || !req.files.images) {
      return res.status(400).json({ message: "Images are required" });
    }

    req.body.images = req.files.images.map((file) => file.filename);

    const updateRoom = await RoomModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (updateRoom) {
      res.json({ message: "Done", Room: updateRoom });
    } else {
      res.status(404).json({ message: "Room Not Found" });
    }
  }
);


// Delet Room
const deleteRoom = handleError(
    async(req,res,next)=>{
        let room = await RoomModel.findByIdAndDelete(req.params.id)
        room && res.status(201).json({message:"Done",room})
        !room && res.status(400).json({message:"Not Found Room"})
    }
)


export{
    AddRoom,
    getAllRoom,
    getRoomById,
    getRoomByName,
    updateRoom,
    deleteRoom
}