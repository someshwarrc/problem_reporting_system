const { ensureAdmin, ensureExecutive } = require("../config/auth");
const {
  addProblem,
  delProblem,
  assignProblem,
  escalateProblem,
  completeProblem,
} = require("../controllers/problems.controller");

const router = require("express").Router();

// GET problems/add
router
  .route("/add")
  .get((req, res) => {
    res.render("problems");
  })
  .post(addProblem);

router.route("/delete/:id").get(ensureAdmin, delProblem);

router.route("/assign/:id").get(ensureExecutive, assignProblem);

router.route("/escalate/:id").get(ensureAdmin, escalateProblem);

router.route("/complete/:id").get(ensureExecutive, completeProblem);

module.exports = router;
