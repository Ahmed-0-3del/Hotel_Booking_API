
import { handleError } from './../../../middleware/handelErorr.js';
import HotelModel from './../../../../db/models/Hotel.model.js';
import { AppError } from '../../../utils/AppErorr.js';
import RoomModel from './../../../../db/models/room.model.js';
import BookingModel from '../../../../db/models/Booking.model.js';





 const createBooking = handleError(
  async (req, res, next) => {
    const { hotel, room, startDate, endDate, totalGuests } = req.body;

    //  تحقق من وجود الفندق
    const foundHotel = await HotelModel.findById(hotel);
    if (!foundHotel) return next(new AppError("Hotel not found", 404));

    //  تحقق من وجود الغرفة
    const foundRoom = await RoomModel.findById(room);
    if (!foundRoom) return next(new AppError("Room not found", 404));

    //  حساب عدد الليالي
    const checkInDate = new Date(startDate);
    const checkOutDate = new Date(endDate);
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (isNaN(nights) || nights <= 0)
      return next(new AppError("Invalid date range", 400));

    //  حساب السعر الكلي
    const totalPrice = foundRoom.price * nights;

    // تحديد الـ user
    const userId = req.user.role === "admin" ? req.body.user : req.user._id;

    //  تحديث تواريخ الغرفة المحجوزة
    const updatedRoomNumbers = foundRoom.roomNumbers.map((roomObj) => ({
      ...roomObj.toObject(),
      unavailableDates: [
        ...roomObj.unavailableDates,
        ...getDatesInRange(checkInDate, checkOutDate),
      ],
    }));

    foundRoom.roomNumbers = updatedRoomNumbers;
    await foundRoom.save();

    //  إنشاء الحجز
    const booking = await BookingModel.create({
      user: userId,
      hotel,
      room,
      startDate,
      endDate,
      totalGuests,
      totalPrice,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  }
);


// GET My Bookings
 const getMyBookings = handleError(
  async(req,res,next)=>{
    let bookings = await BookingModel.find({user:req.user._id}).populate("hotel", "name city").populate("room", "title price");
    res.status(200).json({message: "My Bookings fetched successfully", results: bookings.length,bookings,})

  }
)

// Get All Bookings
const getAllBookings = handleError(
  async(req,res,next)=>{
    let bookings = await BookingModel.find()
    .populate("user", "name email")             // بيانات اليوزر
    .populate("hotel", "name city")            // بيانات الفندق
    .populate("room", "title price");         // بيانات الغرفة

     if (!bookings || bookings.length === 0) {
        return next(new AppError("No bookings found", 404));
    }

     res.status(200).json({message: "All bookings fetched successfully",count: bookings.length,bookings});
  }
)

// get gooking by id
const getBookingById = handleError(
  async(req,res,next)=>{
    let {id}= req.params
    let booking = await BookingModel.findById(id)
     .populate("user", "name email")
     .populate("hotel", "name city")
     .populate("room", "title price");

     if (!booking) return next(new AppError("Booking not found", 404));
     res.status(200).json({ message: "Booking fetched successfully",booking});

  }
)


// update Booking
const updateBooking = handleError(
    async (req, res, next) => {
    const { id } = req.params;

    // 1. نجيب الحجز
    const booking = await BookingModel.findById(id);
    if (!booking) return next(new AppError("Booking not found", 404));

    // 2. السماح فقط لصاحب الحجز أو الأدمن
    if (req.user.role === "user" && req.user._id.toString() !== booking.user.toString()) {
      return next(new AppError("Not authorized", 403));
    }

    // 3. البيانات الجديدة
    const { startDate, endDate, room, totalGuests } = req.body;

    // 4. نحذف التواريخ القديمة من الغرفة القديمة
    const oldRoom = await RoomModel.findById(booking.room);
    if (oldRoom) {
      oldRoom.roomNumbers = oldRoom.roomNumbers.map((roomObj) => {
        const updatedDates = roomObj.unavailableDates.filter((date) => {
          return date < booking.startDate || date >= booking.endDate;
        });
        return { ...roomObj.toObject(), unavailableDates: updatedDates };
      });
      await oldRoom.save();
    }

    // 5. نجيب الغرفة الجديدة لو اتغيرت، أو نستخدم القديمة
    let selectedRoom = room ? await RoomModel.findById(room) : oldRoom;
    if (!selectedRoom) return next(new AppError("Room not found", 404));

    const start = new Date(startDate || booking.startDate);
    const end = new Date(endDate || booking.endDate);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (nights <= 0) return next(new AppError("Invalid date range", 400));

    // 6. نحجز التواريخ الجديدة في الغرفة
    const updatedDates = getDatesInRange(start, end);
    selectedRoom.roomNumbers = selectedRoom.roomNumbers.map((roomObj) => {
      return {
        ...roomObj.toObject(),
        unavailableDates: [...roomObj.unavailableDates, ...updatedDates],
      };
    });
    await selectedRoom.save();

    // 7. نحسب السعر
    const newPrice = selectedRoom.price * nights;

    // 8. نحدث الحجز
    const updatedBooking = await BookingModel.findByIdAndUpdate(
      id,
      {
        startDate: start,
        endDate: end,
        totalPrice: newPrice,
        totalGuests: totalGuests || booking.totalGuests,
        room: selectedRoom._id,
      },
      { new: true }
    );

    res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
  }
);




// Delete Booking
const deleteBooking = handleError(
  async (req, res, next) => {
    const { id } = req.params;

    const booking = await BookingModel.findById(id);
    if (!booking) return next(new AppError("Booking not found", 404));

    if (req.user.role === "user" && req.user._id.toString() !== booking.user.toString()) {
      return next(new AppError("Not authorized", 403));
    }

    let deleteBooking = await BookingModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Booking deleted successfully",deleteBooking });
  }
);









//  دالة لحساب التواريخ في المدى
function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());
  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}




export{
createBooking,
getMyBookings,
getAllBookings,
getBookingById,
updateBooking,
deleteBooking
}
