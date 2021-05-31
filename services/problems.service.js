const Problems = require("../models/Problems");
const ApiError = require("../utils/ApiError");
const { getExecLevel } = require("./employee.service");

// create new problem, save into db
const report_new_problem = async (problem_obj) => {
  const problem = await Problems.create(problem_obj);
  if (!problem) {
    return null;
  }
  return problem;
};

// escalating problem level
const escalate_problem = async (problem_id) => {
  const problem = await Problems.findByIdAndUpdate(problem_id, {
    $inc: { level: 1 },
  });
  if (!problem) {
    return null;
  }
  return problem;
};

const get_problem_level = async (problem_id) => {
  const problem = await Problems.findById(problem_id);
  if (!problem) {
    return null;
  }
  return problem.level;
};

// assigning problem to an employee
// can also be used to re-assign / pull problems
const assign_problem = async (problem_id, emp_id) => {
  const problem_level = await get_problem_level(problem_id);
  const exec_level = await getExecLevel(emp_id);

  if (problem_level > exec_level) {
    return "GL";
  }

  const problem = await Problems.findByIdAndUpdate(
    { _id: problem_id },
    {
      assigned: true,
      assigned_to: emp_id,
    }
  );
  if (!problem) {
    return null;
  }
  return problem;
};

// set problem status complete
const set_problem_complete = async (problem_id, emp_id) => {
  const problem = await Problems.findByIdAndUpdate(
    { _id: problem_id },
    {
      completed: true,
      completed_by: emp_id,
      completed_on: Date.now(),
    }
  );
  if (!problem) {
    return null;
  }
  return problem;
};

const fetch_all_problems = async () => {
  const problems = await Problems.find({})
    .populate("reported_by")
    .populate("assigned_to")
    .populate("completed_by");
  if (problems.length === 0) return null;
  return problems;
};

const fetch_problems_assigned_to_employee = async (emp_id) => {
  const problems = await Problems.find({ assigned_to: emp_id })
    .populate("reported_by")
    .populate("assigned_to")
    .populate("completed_by");
  if (problems.length === 0) return null;

  return problems;
};

const fetch_problems_completed_by_employee = async (emp_id) => {
  const problems = await Problems.find({ completed_by: emp_id })
    .populate("reported_by")
    .populate("assigned_to")
    .populate("completed_by");
  if (problems.length === 0) return null;

  return problems;
};

const fetch_problems_reported_by_employee = async (emp_id) => {
  const problems = await Problems.find({ reported_by: emp_id })
    .populate("reported_by")
    .populate("assigned_to")
    .populate("completed_by");
  return problems;
};

const deleteProblem = async (problem_id) => {
  const problem = await Problems.findByIdAndRemove(problem_id);
  if (!problem) {
    return null;
  }
  return problem;
};

const get_problem_mail_details = async (problem_id) => {
  const problem = await Problems.findById(problem_id)
    .populate("reported_by")
    .populate("assigned_to");
  if (!problem) {
    return null;
  }

  return {
    staff_mail: problem.reported_by.email,
    assigned_to: problem.assigned_to.emp_id + ":" + problem.assigned_to.name,
    staff_problem_statement: problem.category + " - " + problem.description,
  };
};

module.exports = {
  report_new_problem,
  deleteProblem,
  escalate_problem,
  set_problem_complete,
  assign_problem,
  fetch_all_problems,
  get_problem_mail_details,
  fetch_problems_assigned_to_employee,
  fetch_problems_completed_by_employee,
  fetch_problems_reported_by_employee,
};
