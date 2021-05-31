const logger = require("../config/logger");
const User = require("../models/User");
const {
  displayEmployees,
  addUser,
  deleteUser,
} = require("../services/employee.service");
const catchAsync = require("../utils/catchAsync");

const newUser = catchAsync(async (req, res) => {
  const user = await addUser(req.body);

  if (!user) {
    req.flash("error_msg", "User not created");
  } else {
    req.flash("success_msg", "User was succesfully created.");
  }

  res.redirect("/employee");
});

const listUser = catchAsync(async (req, res) => {
  const users = await displayEmployees();

  res.render("dashboard", { employeeList: users, user: req.user });
});

const delUser = catchAsync(async (req, res) => {
  const user = await deleteUser(req.params.id);

  if (!user) {
    req.flash("error_msg", "Couldn't delete user");
  } else {
    req.flash("success_msg", "Deleted user successfully");
  }

  res.redirect("/employee");
});

module.exports = {
  listUser,
  newUser,
  delUser,
};
