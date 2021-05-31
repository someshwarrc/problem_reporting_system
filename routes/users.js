const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/users.controller");
const { forwardAuthenticated } = require("../config/auth");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Logout
router.get("/logout", logout);

module.exports = router;
