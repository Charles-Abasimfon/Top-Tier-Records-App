const mongoose = require('mongoose');

// LOGS MODEL
const logsSchema = mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, 'Missing date'],
    },
    time: {
      type: String,
      required: [true, 'Missing time'],
    },
    job_id: {
      type: String,
      required: [true, 'Missing job id'],
    },
    title: {
      type: String,
      required: [true, 'Missing title'],
    },
    info: {
      type: String,
      required: [true, 'Missing log info'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Logs', logsSchema);
