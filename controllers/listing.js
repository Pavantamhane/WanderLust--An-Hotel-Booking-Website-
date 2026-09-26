const Listing = require("../models/listing.js");

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  console.log(allListings); // 👈 ADD THIS
  res.render("listings/index.ejs", { allListings });
};
module.exports.showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("reviews");
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  try {
    const data = req.body.listing || {};
    
    if (req.file) {
      data.image = {
        filename: req.file.filename,
        url: `/uploads/${req.file.filename}`
      };
    } else {
      data.image = {
        filename: "listingimage",
        url: "https://img.freepik.com/premium-photo/palm-tree-is-reflected-pool-with-boat-water_1105043-116229.jpg"
      };
    }
    
    const newListing = new Listing(data);
    await newListing.save();
    req.flash("success", "Listing created!");
    res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", err.message);
    res.redirect("/listings/new");
  }
};

module.exports.renderEditForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  
  // Get original image URL
  const originalImageUrl = listing.image?.url || "";
  
  // Pass to view
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.id, { ...req.body.listing });
  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${req.params.id}`);
};

module.exports.deleteListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};

// const Listing = require("../models/listing");

// //New
// module.exports.renderNewForm= (req, res) => {  
//   res.render("listings/new.ejs");
// };
// //Index
// module.exports.index=async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("listings/index.ejs", { allListings });
// }

// //Show
// module.exports.showListing=async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id).populate("reviews");
//   if(!listing){
//     req.flash("error", "Cannot find that listing!"); 
//     res.redirect("/listings");
//   }
//   console.log(listing);
//   res.render("listings/show.ejs", { listing });
// };

// //Create
// module.exports.createListing = async (req, res) => {
//   const listing = new Listing(req.body.listing);

//   // ✅ IMPORTANT FIX
//   if (req.file) {
//     listing.image = {
//       url: `/uploads/${req.file.filename}`,
//       filename: req.file.filename
//     };
//   }

//   await listing.save();
//   req.flash("success", "Listing created successfully!");
//   res.redirect("/listings");
// };

// // module.exports.createListing = async (req, res, next) => {
// //  const newListing = new Listing(req.body.listing);
// //  await newListing.save();
// //  req.flash("success", "Successfully created a new listing!");
// //  res.redirect("/listings");
// // };

//  //Edit
//  module.exports.renderEditForm = async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);

//   if (!listing) {
//     req.flash("error", "Cannot find that listing!");
//     return res.redirect("/listings");
//   }

//   // ✅ ADD THIS
//   let originalImageUrl = listing.image?.url || "";

//   // ✅ PASS IT TO VIEW
//   res.render("listings/edit.ejs", { listing, originalImageUrl });
// };
// //  module.exports.renderEditForm=async (req, res) => {
// //   let { id } = req.params;
// //   const listing = await Listing.findById(id);
// //     if(!listing){
// //     req.flash("error", "Cannot find that listing!"); 
// //     res.redirect("/listings");
// //   }
// //   res.render("listings/edit.ejs", { listing }); 
// // }

// //Update
// module.exports.updateListing=async (req, res) => {
//   let { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   req.flash("success", "Successfully updated a listing!"); 
//   res.redirect(`/listings/${id}`);
// };

// //Delete
// module.exports.deleteListing=async (req, res) => {
//   let { id } = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   console.log(deletedListing)
//   req.flash("success", "Successfully Deleted a listing!"); 
//   res.redirect(`/listings`);
// };