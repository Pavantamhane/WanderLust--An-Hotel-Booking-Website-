if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

// MongoDB Connection
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB");
}
main().catch((err) => console.log(err));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// 🔥 IMPORTANT: make sure uploads folder exists
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Session
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// Flash middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ✅ ROOT ROUTE (FIX)
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// Routes
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// 404 Handle
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!!"));
});
// Error Handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { err });
});

// Server
app.listen(8080, () => {
  console.log("Server running on port 8080");
});


// if( process.env.NODE_ENV !== "production"){
//     require('dotenv').config();
// }

// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const path = require('path');
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const ExpressError = require("./utils/ExpressError.js");
// const session = require('express-session');
// const flash = require('connect-flash');

// const listings = require('./routes/listing.js');
// const reviews = require('./routes/review.js');

// // Connect to MongoDB
// const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

// async function main() {
//   await mongoose.connect(MONGO_URL);
//   console.log('Connected to MongoDB');
// }
// main().catch(err => console.log(err));

// // View Engine Setup
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.engine('ejs', ejsMate);

// // Middleware (call urlencoded ONCE)
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(methodOverride("_method"));
// app.use(express.static(path.join(__dirname, "/public")));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); //ERRRRRRORRRR


// // Session & Flash
// const sessionOptions = {
//   secret: "mysupersecretcode",
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
//     maxAge: 1000 * 60 * 60 * 24 * 7,
//     httpOnly: true,
//   }
// };

// app.use(session(sessionOptions));
// app.use(flash());

// // Flash locals middleware
// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   next();
// });


// // // Root route
// // app.get('/', (req, res) => {
// //   res.send('Hi, I am root');
// // });

// // Routes
// app.use("/listings", listings);
// app.use("/listings/:id/reviews", reviews);

// // 404 Handler
// app.use((req, res, next) => {
//   next(new ExpressError(404, "Page not Found!!"));
// });

// // Error Handler
// app.use((err, req, res, next) => {
//   let { statusCode = 500, message = "Something went wrong" } = err;
//   res.status(statusCode).render("error.ejs", { err });
// });

// // Start the server (LAST)
// app.listen(8080, () => {
//   console.log('Server is running on port 8080');
// });

