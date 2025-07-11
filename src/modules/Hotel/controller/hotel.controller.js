
import HotelModel from '../../../../db/models/Hotel.model.js';
import ApiFeatuer from '../../../utils/APifuter.js';
import { addHotelValidation, updateHotelValidation} from '../validationHotel.js';
import { handleError } from './../../../middleware/handelErorr.js';




// Add Hotel
const AddHotel = handleError(
  async (req, res, next) => {
        req.body.images = req.files.images;

    const { error } = addHotelValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details?.[0]?.message || "Validation failed",
      });
    }

    if (!req.files || !req.files.images) {
      return res.status(400).json({ message: "Images are required" });
    }

    req.body.images = req.files.images.map((ele) => ele.filename);

    const newhotel = new HotelModel(req.body);
    let addedHotel = await newhotel.save();

    res.status(201).json({ message: "Added", addedHotel });
  }
);



// Get All
const getAllHotel = handleError(
    async(req,res,next)=>{
            let apiFeatuer = new ApiFeatuer(HotelModel.find(),req.query).pagination().filter().sort().search().fields()
            let allhotel = await apiFeatuer.mongooseQuery
            res.status(200).json({message:"All Hotel",page:apiFeatuer.page,allhotel})
    }
)

// Get Hotel By Id
const gethotelById = handleError(
      async(req,res,next)=>{
        let hotelById = await HotelModel.findById(req.params.id)
        res.status(201).json({message:"Done",hotelById})
      }
)


// Get Hotel By Name
const gethotelByName = handleError(
      async(req,res,next)=>{
        const {name} = req.params
        let hotelByName = await HotelModel.findOne({name})

        if(!hotelByName){
            return res.status(404).json({message:"Hotel Not Found"})
        } else{
          res.status(201).json({message:"Done",hotelByName})
        }
      }
)


// Update Hotel
const updateHotel = handleError(
  async (req, res, next) => {
    //  التحقق لازم يتم قبل أي تعديل في الصور
    const { error } = updateHotelValidation.validate({
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

    const updatehotel = await HotelModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (updatehotel) {
      res.json({ message: "Done", hotel: updatehotel });
    } else {
      res.status(404).json({ message: "Hotel Not Found" });
    }
  }
);


// Delet Hotel
const deleteHotel = handleError(
    async(req,res,next)=>{
        let hotel = await HotelModel.findByIdAndDelete(req.params.id)
        hotel && res.status(201).json({message:"Done",hotel})
        !hotel && res.status(400).json({message:"Not Found Hotel"})
    }
)


export{
    AddHotel,
    getAllHotel,
    gethotelById,
    gethotelByName,
    updateHotel,
    deleteHotel
}