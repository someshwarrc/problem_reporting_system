const express = require("express");
const router = express.Router();
const path = require("path");
const {
  ensureAuthenticated,
  forwardAuthenticated,
  ensureAdmin,
} = require("../config/auth");
const logger = require("../config/logger");
const { report } = require("../controllers/report.controller");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

router.post("/report", ensureAdmin, report);

router.get("/report/download", ensureAdmin, (req, res) => {
  res.download(path.join(__dirname, "..", "report.csv"));
  // console.log(path.join(__dirname, "..", "report.csv"));
  logger.info("Report downloaded.");
});

module.exports = router;
