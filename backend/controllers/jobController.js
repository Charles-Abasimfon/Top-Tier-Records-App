const asyncHandler = require('express-async-handler');
//Importing Job Model
const Job = require('../models/jobModel');
//Importing extra major functions
const { getJobStatus, getHowLate } = require('./majorfunctions/jobFunctions');

// JOB CONTROLLERS**

//@desc Add Job
//@route POST /api/job/add
//@access Private
const addJob = asyncHandler(async (req, res) => {
  const {
    payment_status,
    main_category,
    sub_categories,
    designer_tag,
    client_name,
    start_date,
  } = req.body;

  // Check for missing required fields
  if (
    !payment_status ||
    !main_category ||
    !sub_categories ||
    !designer_tag ||
    !client_name ||
    !start_date
  ) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }
  //Create Job
  const data = {
    ...req.body,
  };
  const job = await Job.create(data);
  if (job) {
    res.status(201).json(job);
  } else {
    res.status(400);
    throw new Error('Job could not be added, please try again');
  }
});

//@desc Get all Jobs
//@route GET /api/job/get-all
//@access Private
const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({})
    .sort({ _id: -1 })
    .limit(0)
    .lean()
    .exec(function (err, allJobs) {
      if (err) {
        res.status(400);
        throw new Error('Could not get jobs');
      }
      //Loop through all Jobs and add the status to each job and how late it is
      allJobs.forEach((job) => {
        job.status = getJobStatus(
          job.start_date,
          job.is_completed_status,
          job.main_category
        );
        job.how_late = getHowLate(
          job.start_date,
          job.is_completed_status,
          job.main_category
        );
      });
      res.status(200).json(allJobs);
    });
});

//@desc Get A Jobs Info By Id (id is passed as a parameter)
//@route GET /api/job/get-job-data/?id=:id
//@access Private
const getJobInfoById = asyncHandler(async (req, res) => {
  const jobId = req.query.id;

  // Check for missing id tag
  if (!jobId) {
    res.status(400);
    throw new Error('Missing id tag');
  }
  const job = await Job.findById(jobId)
    .lean()
    .exec(function (err, job) {
      if (err) {
        res.status(400);
        throw new Error('Could not get job');
      }
      const formattedJob = job;
      formattedJob.status = getJobStatus(
        job.start_date,
        job.is_completed_status,
        job.main_category
      );
      formattedJob.how_late = getHowLate(
        job.start_date,
        job.is_completed_status,
        job.main_category
      );
      //If job is found
      res.status(201).json(formattedJob);
    });
});

//@desc Update a Job's Data By Id (id and property to be updated are passed as a parameter)
//@route PUT /api/job/update-job-data/?id=:id&property=:property
//@access Private
const updateJobDataById = asyncHandler(async (req, res) => {
  const jobId = req.query.id;
  const property = req.query.property;
  const { new_value } = req.body;
  // Check for missing id query or property query
  if (!jobId || !property) {
    res.status(400);
    throw new Error('Missing id/property query');
  }
  //Check for missing new_value in body
  if (!new_value) {
    res.status(400);
    throw new Error('Missing/empty new value');
  }
  const job = await Job.findByIdAndUpdate(
    jobId,
    { [property]: new_value },
    { new: true }
  );
  if (job) {
    res.status(201).json(job);
  } else {
    res.status(400);
    throw new Error('Could not update job');
  }
});

//@desc Get all Pending Jobs
//@route GET /api/job/get-all-pending-jobs
//@access Private
const getAllPendingJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({})
    .sort({ _id: -1 })
    .limit(0)
    .lean()
    .exec(function (err, jobs) {
      if (err) {
        res.status(400);
        throw new Error('Could not get jobs');
      }
      jobs.forEach((job) => {
        job.status = getJobStatus(
          job.start_date,
          job.is_completed_status,
          job.main_category
        );
        job.how_late = getHowLate(
          job.start_date,
          job.is_completed_status,
          job.main_category
        );
      });
      //Get all jobs with status 'Pending'
      const pendingJobs = jobs.filter((job) => job.status === 'Pending');
      res.status(200).json(pendingJobs);
    });
});

//@desc Get all Late Jobs
//@route GET /api/job/get-all-late-jobs
//@access Private
const getAllLateJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({})
    .sort({ _id: -1 })
    .limit(0)
    .lean()
    .exec(function (err, jobs) {
      if (err) {
        res.status(400);
        throw new Error('Could not get jobs');
      }
      jobs.forEach((job) => {
        job.status = getJobStatus(
          job.start_date,
          job.is_completed_status,
          job.main_category
        );
        job.how_late = getHowLate(
          job.start_date,
          job.is_completed_status,
          job.main_category
        );
      });
      //Get all jobs with status 'Late'
      const lateJobs = jobs.filter((job) => job.status === 'Late');
      res.status(200).json(lateJobs);
    });
});

//@desc Get all Completed Jobs
//@route GET /api/job/get-all-completed-jobs
//@access Private
const getAllCompletedJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({})
    .sort({ _id: -1 })
    .limit(0)
    .lean()
    .exec(function (err, jobs) {
      if (err) {
        res.status(400);
        throw new Error('Could not get jobs');
      }
      jobs.forEach((job) => {
        job.status = getJobStatus(
          job.start_date,
          job.is_completed_status,
          job.main_category
        );
        job.how_late = getHowLate(
          job.start_date,
          job.is_completed_status,
          job.main_category
        );
      });
      //Get all jobs with status 'Completed'
      const completedJobs = jobs.filter((job) => job.status === 'Completed');
      res.status(200).json(completedJobs);
    });
});

//@desc Search For Jobs based on client_name, payment_status, main_category, sub_categories, designer_tag, is_completed_status, shorter_id
//@route GET /api/job/search-jobs?search=:search
//@access Private
const searchJobs = asyncHandler(async (req, res) => {
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

  //The below handles the completedStatus amd isCompleted values to improve the search results
  let completedStatus = ['Completed', 'Pending', 'Late'];
  if (
    searchQuery.includes('completed') ||
    searchQuery.includes('pending') ||
    searchQuery.includes('late')
  ) {
    completedStatus = [];
  }
  let isCompleted = undefined;
  if (searchQuery.includes('completed')) {
    completedStatus.push('Completed');
    isCompleted = true;
  }
  if (searchQuery.includes('pending')) {
    completedStatus.push('Pending');
    isCompleted = false;
  }
  if (searchQuery.includes('late')) {
    completedStatus.push('Late');
    isCompleted = false;
  }

  const jobsMatch = await Job.find({
    $or: [
      { client_name: { $in: searchQueryRegex } },
      { main_category: { $in: searchQueryRegex } },
      { sub_categories: { $in: searchQueryRegex } },
      { designer_tag: { $in: searchQueryRegex } },
      { payment_status: { $in: searchQueryRegex } },
      { shorter_id: { $in: searchQueryRegex } },
      { start_date: { $in: searchQueryRegex } },
      { is_completed_status: isCompleted },
    ],
  })
    .sort({ _id: -1 })
    .limit(0)
    .lean()
    .exec(function (err, jobs) {
      if (err) {
        res.status(400);
        throw new Error('Could not get jobs');
      }
      jobs.forEach((job) => {
        job.status = getJobStatus(
          job.start_date,
          job.is_completed_status,
          job.main_category
        );
        job.how_late = getHowLate(
          job.start_date,
          job.is_completed_status,
          job.main_category
        );
      });
      let formattedJobs = jobs.filter((job) =>
        completedStatus.includes(job.status)
      );
      res.status(200).json(formattedJobs);
    });
});

module.exports = {
  addJob,
  getAllJobs,
  getJobInfoById,
  updateJobDataById,
  getAllPendingJobs,
  getAllLateJobs,
  getAllCompletedJobs,
  searchJobs,
};
