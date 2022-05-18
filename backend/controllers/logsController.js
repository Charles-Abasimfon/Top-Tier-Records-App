const asyncHandler = require('express-async-handler');
const Logs = require('../models/logsModel');

//@desc Create Logs
//@route POST /api/logs/create
//@access Private
const createLog = asyncHandler(async (req, res) => {
  const { title, info, job_id } = req.body.content;
  // Check for missing fields: info
  if (!title || !info || !job_id) {
    res.status(400);
    throw new Error('Please enter all required fields - content');
  }
  //Get todays date
  var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  let date = localISOTime.slice(0, 16);
  let d = new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'Africa/Lagos',
    })
  );
  let time = d.toLocaleTimeString('en-US');

  const log = await Logs.create({
    title,
    info,
    job_id,
    date,
    time,
  });
  if (log) {
    res.status(204).json({ message: 'Log created successfully' });
  } else {
    res.status(400);
    throw new Error('Log could not be created, please try again');
  }
});

//@desc Get all Logs
//@route GET /api/logs/get-all
//@access Private
const getAllLogs = asyncHandler(async (req, res) => {
  const logs = await Logs.find({}).sort({ _id: -1 }).limit(0);
  if (logs) {
    res.status(200).json(logs);
  } else {
    res.status(400);
    throw new Error('Could not get logs');
  }
});

//@desc Get Logs by job_id
//@route GET /api/logs/get-logs-by-job-id?id=:id
//@access Private
const getLogsByJobId = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const logs = await Logs.find({ job_id: id }).sort({ _id: -1 }).limit(0);
  if (logs) {
    res.status(200).json(logs);
  } else {
    res.status(400);
    throw new Error('Could not get logs');
  }
});

//@desc Search For Logs based on date, time, job_id, title, info
//@route GET /api/logs/search-logs?search=:search
//@access Private
const searchLogs = asyncHandler(async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(200).json([]);
  }

  //Converts the search query into an array of strings and removes falsy values like empty strings''
  let searchQuery = search
    .toLowerCase()
    .split(',')
    .filter((query) => query);
  //Converts the array of strings into an array of regex
  let searchQueryRegex = searchQuery
    .map((searchItem) => {
      return new RegExp(searchItem, 'i');
    })
    .filter((query) => query);

  const logsMatch = await Logs.find({
    $or: [
      { date: { $in: searchQueryRegex } },
      { time: { $in: searchQueryRegex } },
      { job_id: { $in: searchQueryRegex } },
      { title: { $in: searchQueryRegex } },
      { info: { $in: searchQueryRegex } },
    ],
  })
    .sort({ _id: -1 })
    .limit(0);

  if (logsMatch) {
    res.status(200).json(logsMatch);
  } else {
    res.status(400);
    throw new Error('Could not get logs');
  }
});

module.exports = {
  createLog,
  getAllLogs,
  getLogsByJobId,
  searchLogs,
};
