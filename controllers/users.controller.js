const logger = require("../config/logger");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const passport = require("passport");

const register = catchAsync(async (req, res, next) => {
  const { emp_id, name, email, password, password2 } = req.body;
  let errors = [];

  if (!emp_id || !name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      emp_id,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ emp_id: emp_id }).then((user) => {
      if (user) {
        errors.push({ msg: "Employee ID already exists" });
        res.render("register", {
          errors,
          emp_id,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          emp_id,
          email,
          password,
        });

        newUser
          .save()
          .then((user) => {
            req.flash("success_msg", "You are now registered and can log in");
            res.redirect("/users/login");
          })
          .catch((err) => logger.error(err));
      }
    });
  }
});

const login = catchAsync(async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

const logout = catchAsync(async (req, res, next) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = {
  register,
  login,
  logout,
};
