const moment = require('moment-timezone');

/*@Desc This function serves to get the job status  */
function getJobStatus(start_date, is_completed_status, main_category) {
  if (is_completed_status === true) {
    return 'Completed';
  }
  if (main_category === 'Website Development') {
    return 'Pending';
  }
  const date1 = moment.tz(start_date, 'Africa/Lagos');
  const date2 = moment.tz('Africa/Lagos');
  var duration = moment.duration(date2.diff(date1));
  var diffInDays = duration.asDays();
  if (diffInDays < 2) {
    return 'Pending';
  }
  if (diffInDays > 2) {
    return 'Late';
  }
}

/*@Desc This function serves to get how late a job is  */
function getHowLate(start_date, is_completed_status, main_category) {
  if (is_completed_status === true) {
    return 'Completed';
  }
  if (main_category === 'Website Development') {
    return moment.tz(start_date, 'Africa/Lagos').fromNow();
  }
  const date1 = moment.tz(start_date, 'Africa/Lagos');
  const date2 = moment.tz('Africa/Lagos');
  var duration = moment.duration(date2.diff(date1));
  var diffInDays = duration.asDays();
  if (diffInDays < 2) {
    return moment.tz(start_date, 'Africa/Lagos').fromNow();
  } else {
    return moment.tz(start_date, 'Africa/Lagos').fromNow();
  }
}

module.exports = {
  getJobStatus,
  getHowLate,
};
