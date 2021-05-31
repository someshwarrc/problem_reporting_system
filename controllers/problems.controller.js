const {
  report_new_problem,
  deleteProblem,
  assign_problem,
  escalate_problem,
  set_problem_complete,
} = require("../services/problems.service");
const catchAsync = require("../utils/catchAsync");

const addProblem = catchAsync(async (req, res) => {
  const problem = req.body;

  Object.assign(problem, { reported_by: req.user._id });

  const prob = await report_new_problem(problem);
  if (!prob) {
    req.flash("error_msg", "Problem was not successfully reported");
  }
  req.flash("success_msg", "Problem was successfully reported");
  res.redirect("/dashboard/staff");
});

const delProblem = catchAsync(async (req, res) => {
  const problem = await deleteProblem(req.params.id);
  if (!problem) {
    req.flash("error_msg", "Problem ID doesn't exist.");
  }
  req.flash("success_msg", "Problem was deleted successfully.");
  res.redirect("/dashboard/admin");
});

const assignProblem = catchAsync(async (req, res) => {
  const problem = await assign_problem(req.params.id, req.user._id);
  if (!problem) {
    req.flash("error_msg", "Problem couldn't be assigned.");
  }
  if (problem == "GL") {
    req.flash("error_msg", "Problem level is higher.");
  }
  req.flash("success_msg", "Problem was assigned successfully.");
  res.redirect("/dashboard/executive");
});

const escalateProblem = catchAsync(async (req, res) => {
  const problem = await escalate_problem(req.params.id);

  console.log(problem);

  if (!problem) {
    req.flash("error_msg", "Problem level wasn't escalated.");
  }

  req.flash("success_msg", "Problem level was escalated successfully");
  res.redirect("/dashboard/admin");
});

const completeProblem = catchAsync(async (req, res) => {
  const problem = await set_problem_complete(req.params.id, req.user._id);

  if (!problem) {
    req.flash("error_msg", "Problem couldn't be marked complete");
  }

  req.flash("success_msg", "Problem marked as complete");
  res.redirect("/dashboard/executive");
});

module.exports = {
  addProblem,
  delProblem,
  assignProblem,
  escalateProblem,
  completeProblem,
};
