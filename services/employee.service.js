const logger = require("../config/logger");
const User = require("../models/User");

const addUser = async (userObj) => {
  const user = await User.create(userObj).catch((err) => {
    logger.error("User couldn't be created. ", err.message);
    return null;
  });
  return user;
};

const updateUser = async (emp_id, update) => {
  const user = await User.findByIdAndUpdate(emp_id, update).catch((err) => {
    logger.error("User couldn't be updated.");
    return null;
  });

  return user || true;
};

const deleteUser = async (emp_id) => {
  const user = await User.findByIdAndDelete(emp_id).catch((err) => {
    logger.error("User couldn't be updated.");
    return null;
  });

  return user || true;
};

const displayEmployees = async () => {
  let user = await User.find({});

  return user;
};

const getExecLevel = async (user_id) => {
  let user = await User.findById(user_id);

  return user.role.split("-")[1];
};

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  getExecLevel,
  displayEmployees,
};
