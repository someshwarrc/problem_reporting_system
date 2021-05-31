const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const session = require("express-session");
const config = require("./config/config");
const { errorConverter, errorHandler } = require("./utils/errors");
const logger = require("./config/logger");
const { ensureAuthenticated, ensureAdmin } = require("./config/auth");
const { admin } = require("./config/config");
const User = require("./models/User");
const app = express();

// Passport Config
require("./config/passport")(passport);

// dotenv
require("dotenv").config();
// Connect to MongoDB
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    logger.info("MongoDB Connected");
    logger.info(
      `Admin Details: \n ID: ${admin.emp_id} \n PASSWORD: ${admin.password}`
    );
    User.findOne({ emp_id: admin.emp_id }, (err, res) => {
      if (err) {
        logger.error(err.message);
        throw err;
      }
      if (res) {
        // admin already registered
        logger.info("Admin details already loaded.");
      } else {
        User.create(admin, (err, details) => {
          if (err) {
            console.log(err.message);
            throw err;
          }
        });
      }
    });
  })
  .catch((err) => logger.error(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.static("public"));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(errorConverter);
app.use(errorHandler);

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/employee", ensureAdmin, require("./routes/employee"));
app.use("/problems", ensureAuthenticated, require("./routes/problems"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, logger.info(`Server running on  ${PORT}`));
