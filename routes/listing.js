const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { v4: uuid } = require("uuid");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const listingController = require("../controllers/listing.js");
const { listingSchema } = require("../schema.js");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "..", "uploads")),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuid()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Validation
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// Routes
router.get("/", wrapAsync(listingController.index));
router.get("/new", listingController.renderNewForm);

router.post(
  "/",
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing)
);

router.get("/:id", wrapAsync(listingController.showListing));

router.get("/:id/edit", wrapAsync(listingController.renderEditForm));

router.put(
  "/:id",
  upload.single("listing[image]"),
  wrapAsync(listingController.updateListing)
);

router.delete("/:id", wrapAsync(listingController.deleteListing));

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const multer = require('multer');
// const { v4: uuid } = require('uuid');
// const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const listingController = require('../controllers/listing.js');
// const { listingSchema } = require("../schema.js");

// // Local disk storage with UUID filename
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${uuid()}${ext}`);
//   }
// });

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }
// });

// const validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };

// router.get("/new", listingController.renderNewForm);
// router.get("/", wrapAsync(listingController.index));
// router.post("/", upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));
// router.get("/:id", wrapAsync(listingController.showListing));
// router.get("/:id/edit", wrapAsync(listingController.renderEditForm));
// router.put("/:id",upload.single('listing[image]'), wrapAsync(listingController.updateListing));
// router.delete("/:id", wrapAsync(listingController.deleteListing));

// module.exports = router;



