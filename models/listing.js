const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    filename: {
      type: String,
      default: "listingimage"
    },
    url: {
      type: String,
      default: "https://img.freepik.com/premium-photo/palm-tree-is-reflected-pool-with-boat-water_1105043-116229.jpg"
    }
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
});

listingSchema.post("findOneAndDelete", async (doc) => {
  if (!doc) return;
  try {
    await Review.deleteMany({ _id: { $in: doc.reviews || [] } });
  } catch (e) {
    console.error("Error deleting reviews for listing:", e);
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const Review= require("./review.js");

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   image: {
//     filename: {
//       type: String,
//       default: "listingimage"
//     },
//     url: {
//       type: String,
//       default: "https://img.freepik.com/premium-photo/palm-tree-is-reflected-pool-with-boat-water_1105043-116229.jpg"
//     }
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   country: {
//     type: String,
//     required: true
//   },
//   reviews: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Review",
//     },

//     category: {
//   type: String,
//   enum: [
//     "Trending",
//     "Rooms",
//     "Cities",
//     "Mountains",
//     "Castles",
//     "Pools",
//     "Camping",
//     "Farms",
//     "Arctic",
//     "Beach",
//     "Boats"
//   ]
// },


//   ]
// });
// listingSchema.post("findOneAndDelete", async (doc) => {
//   // guard against null doc
//   if (!doc) return;
//   try {
//     await Review.deleteMany({ _id: { $in: doc.reviews || [] } });
//   } catch (e) {
//     console.error("Error deleting reviews for listing:", e);
//   }
// });


// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;
