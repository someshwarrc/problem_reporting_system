const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  srno: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  reported_by: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  assigned: {
    type: Boolean,
    default: false,
  },
  assigned_to: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  level: {
    type: Number,
    default: 1,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completed_by: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  completed_on: {
    type: Date,
    default: null,
  },
});

const Problems = mongoose.model("Problems", problemSchema);

module.exports = Problems;
