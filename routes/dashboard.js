const router = require("express").Router();
const {
  fetch_all_problems,
  fetch_problems_reported_by_employee,
} = require("../services/problems.service");
const {
  ensureAuthenticated,
  ensureAdmin,
  ensureExecutive,
  ensureStaff,
} = require("../config/auth");

router.get("/", ensureAuthenticated, async (req, res) => {
  if (req.user.role === "ADMIN") {
    res.redirect("/dashboard/admin");
  }

  if (req.user.role.split("-")[0] === "EXECUTIVE") {
    res.redirect("/dashboard/executive");
  }

  if (req.user.role === "STAFF") {
    res.redirect("/dashboard/staff");
  }
});

router.get("/admin", ensureAdmin, async (req, res) => {
  let problems = await fetch_all_problems();
  res.render("dashboard", {
    problems: problems,
    user: req.user,
  });
});

router.get("/staff", ensureStaff, async (req, res) => {
  let problems = await fetch_problems_reported_by_employee(req.user._id);
  res.render("dashboard", {
    problems: problems,
    user: req.user,
  });
});

router.get("/executive", ensureExecutive, async (req, res) => {
  let problems = await fetch_all_problems();

  res.render("dashboard", {
    problems: problems,
    user: req.user,
  });
});

module.exports = router;
