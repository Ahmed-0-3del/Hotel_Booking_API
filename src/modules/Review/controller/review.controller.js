
import { handleError } from '../../../middleware/handelErorr.js';
import ReviewModel from './../../../../db/models/Review.model.js';
import { AppError } from './../../../utils/AppErorr.js';





// Add Review
const createReview = handleError(
  async (req, res, next) => {
    const { rating, comment, hotel } = req.body;

    // Check if user already reviewed the hotel
    const existing = await ReviewModel.findOne({ hotel, user: req.user._id });
    if (existing) return next(new AppError("You already reviewed this hotel", 400));

    const review = await ReviewModel.create({
      rating,
      comment,
      hotel,
      user: req.user._id,
    });

    res.status(201).json({ message: "Review added successfully", review });
  }
);



// Get All
const getAllReviews = handleError(
  async (req, res, next) => {
    const reviews = await ReviewModel.find()
      .populate("user", "name")
      .populate("hotel", "name");

    res.json({ message: "All reviews", reviews });
  }
);

// Get Review By Id
const getReviewById = handleError(
  async (req, res, next) => {
    const review = await ReviewModel.findById(req.params.id)
      .populate("user", "name")
      .populate("hotel", "name");

    if (!review) return next(new AppError("Review not found", 404));

    res.json({ message: "Review found", review });
  }
);



// Update Review
const updateReview = handleError(
  async (req, res, next) => {
    const review = await ReviewModel.findOne({ _id: req.params.id });

    if (!review) return next(new AppError("Review not found", 404));

    // فقط صاحب الريفيو أو الأدمن يقدر يعدل
    if (req.user.role !== "admin" && review.user.toString() !== req.user._id.toString()) {
      return next(new AppError("Not authorized", 403));
    }

    const updated = await ReviewModel.findByIdAndUpdate(req.params.id,req.body, { new: true });
    res.json({ message: "Review updated successfully", updated });
  }
);


// Delet Review
const deleteReview = handleError(
  async (req, res, next) => {
    const review = await ReviewModel.findOne({ _id: req.params.id });

    if (!review) return next(new AppError("Review not found", 404));

    // فقط صاحب الريفيو أو الأدمن يقدر يحذف
    if (req.user.role !== "admin" && review.user.toString() !== req.user._id.toString()) {
      return next(new AppError("Not authorized", 403));
    }

    await ReviewModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted successfully" });
  }
);

export{
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
}