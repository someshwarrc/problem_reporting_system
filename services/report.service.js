const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Problems = require("../models/Problems");
const logger = require("../config/logger");

const generateReport = async (filter) => {
  const csvWriter = createCsvWriter({
    path: "report.csv",
    header: [
      { id: "title", title: "Title" },
      { id: "description", title: "Description" },
      { id: "location", title: "Location" },
      { id: "level", title: "Level" },
      { id: "date", title: "Date Of Problem" },
      { id: "reported_by", title: "Reported By" },
      { id: "assigned", title: "Assigned" },
      { id: "assigned_to", title: "Assigned To" },
      { id: "completed_by", title: "Completed By" },
      { id: "completed_on", title: "Completed On" },
    ],
  });
  let data = [];
  const docs = await Problems.find(filter)
    .populate("reported_by")
    .populate("assigned_to")
    .populate("completed_by");
  if (docs.length === 0) {
    logger.info("No completed records to generate CSV");
    return 0;
  }
  docs.forEach((doc) => {
    data.push({
      title: doc.category,
      description: doc.description,
      location: doc.location,
      level: doc.level,
      date: doc.date.toString().substring(0, 15),
      reported_by: doc.reported_by.emp_id + ":" + doc.reported_by.name,
      assigned: doc.assigned ? "YES" : "NO",
      assigned_to: doc.assigned
        ? doc.assigned_to.emp_id + ":" + doc.assigned_to.name
        : "N.A",
      completed_by: doc.completed
        ? doc.completed_by.emp_id + ":" + doc.completed_by.name
        : "N.A",
      completed_on: doc.completed
        ? doc.completed_on.toString().substring(0, 15)
        : "N.A",
    });
  });

  return csvWriter.writeRecords(data).then(() => {
    logger.info("The CSV file was written successfully");
    return 1;
  });
};
module.exports = {
  generateReport,
};
