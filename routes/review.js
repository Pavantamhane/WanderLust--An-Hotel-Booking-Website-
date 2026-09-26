const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const reviewController = require("../controllers/reviews.js");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// Create review
router.post("/", validateReview, wrapAsync(reviewController.createReview));

// Delete review
router.delete("/:reviewId", wrapAsync(reviewController.destroyReview));

module.exports = router;


// const express = require('express');
// const router = express.Router({ mergeParams: true });
// const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { reviewSchema } = require("../schema.js");
// const Review = require('../models/review.js');
// const Listing = require('../models/listing.js');

// const validateReview = (req, res, next) => {
//   const { error } = reviewSchema.validate(req.body);
//   if (error) {
//     const errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   }
//   next();
// };

// // Create review
// router.post("/", validateReview, wrapAsync(async (req, res, next) => {
//   const { id } = req.params; // listing id
//   const listing = await Listing.findById(id);
//   if (!listing) {
//     return next(new ExpressError(404, "Listing not found"));
//   }

//   const newReview = new Review(req.body.review);
//   await newReview.save();

//   listing.reviews.push(newReview._id);
//   await listing.save();

//   res.redirect(`/listings/${listing._id}`);
// }));

// // Delete review
// router.delete("/:reviewId", wrapAsync(async (req, res, next) => {
//   const { id, reviewId } = req.params;
//   const listing = await Listing.findById(id);
//   if (!listing) {
//     return next(new ExpressError(404, "Listing not found"));
//   }

//   await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//   await Review.findByIdAndDelete(reviewId);

//   res.redirect(`/listings/${id}`);
// }));

// module.exports = router;