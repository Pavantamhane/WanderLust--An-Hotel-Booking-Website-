const Listing = require("../models/listing");
const Review = require("../models/review");

// Create review
module.exports.createReview = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(new Error("Listing not found"));
  }
  const newReview = new Review(req.body.review);
  await newReview.save();
  listing.reviews.push(newReview._id);
  await listing.save();
  req.flash("success", "Successfully created a new review!");
  res.redirect(`/listings/${listing._id}`);
};

// Delete review
module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted the review!");
  res.redirect(`/listings/${id}`);
};