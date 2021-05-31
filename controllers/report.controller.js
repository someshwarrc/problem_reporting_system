const { generateReport } = require("../services/report.service");
const catchAsync = require("../utils/catchAsync");

const report = catchAsync(async (req, res) => {
  const reportOptions = req.body.reportOptions;

  let resp;
  if (reportOptions == "a") {
    resp = await generateReport({});
  } else if (reportOptions == "c") {
    resp = await generateReport({ completed: true });
  } else if (reportOptions == "p") {
    resp = await generateReport({ assigned: true, completed: false });
  } else {
    //reportOptions == 'u'
    resp = await generateReport({ assigned: false });
  }

  res.redirect("/report/download");
});

module.exports = {
  report,
};
