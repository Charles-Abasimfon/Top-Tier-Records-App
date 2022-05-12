import axios from 'axios';
import { createLog } from './logCalls';
/* 
 desc: GET ALL JOBS
*/
export const getAllJobs = async (token) => {
  try {
    const response = await axios.get('/api/job/get-all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

/* 
 desc: ADD NEW JOB
*/
export const addNewJob = async (token, admin_name, data) => {
  try {
    const response = await axios.post(
      '/api/job/add',
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    createLog(token, {
      title: `NEW JOB RECORD ADDED BY ${admin_name} - ${response.data.shorter_id}`,
      info: `JOB DETAILS: ID: ${response.data.shorter_id}, START DATE: ${
        response.data.start_date
      }, CLIENT NAME: ${response.data.client_name}, PAYMENT STATUS: ${
        response.data.payment_status
      }, MAIN CATEGORY: ${response.data.main_category}, SUB CATEGORIES: ${
        response.data.sub_categories
      }, DESIGNER TAG: ${response.data.designer_tag}, NOTE: ${
        response.data.note
      }, ADDITIONAL INFO: ${response.data.additional_info || 'NONE'}.`,
      job_id: response.data._id,
    });
    return {
      ...response.data,
      isError: false,
    };
  } catch (error) {
    return {
      ...error.response.data,
      isError: true,
    };
  }
};

/* 
 desc: GET A PARTICULAR JOB'S DATA BY ID
*/
export const getJobDataById = async (token, id) => {
  try {
    const response = await axios.get(`/api/job/get-job-data/?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

/* 
 desc: UPDATE A PARTICULAR JOB'S STATUS TO COMPLETED
*/
export const updateJobStatusToCompletedById = async (
  token,
  id,
  admin_name,
  admin_level
) => {
  try {
    let setting = '';
    if (admin_level === 'Recorder') {
      setting = 'can_recorders_mark_jobs_as_completed';
    }
    if (admin_level === 'Moderator') {
      setting = 'can_moderators_mark_jobs_as_completed';
    }

    const response = await axios.put(
      `/api/job/update-job-data/?id=${id}&property=is_completed_status`,
      {
        new_value: true,
        settingToBeEnforced: setting,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    createLog(token, {
      title: `UPDATE TO JOB RECORD BY ${admin_name} - ${response.data.shorter_id}`,
      info: `${admin_name} changed job status to "Completed", Job ID: ${response.data.shorter_id}.`,
      job_id: response.data._id,
    });
    return {
      ...response.data,
      isError: false,
    };
  } catch (error) {
    return {
      ...error.response.data,
      isError: true,
    };
  }
};

/* 
 desc: UPDATE A PARTICULAR JOB'S DATA BY ID
*/
export const updateJobDataById = async (token, id, property, new_value) => {
  try {
    const response = await axios.put(
      `/api/job/update-job-data/?id=${id}&property=${property}`,
      { new_value: new_value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      ...response.data,
      isError: false,
    };
  } catch (error) {
    return {
      ...error.response.data,
      isError: true,
    };
  }
};

/* 
 desc: GET ALL EARLY/PENDING JOBS
*/
export const getAllPendingJobs = async (token) => {
  try {
    const response = await axios.get('/api/job/get-all-pending-jobs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

/* 
 desc: GET ALL LATE JOBS
*/
export const getAllLateJobs = async (token) => {
  try {
    const response = await axios.get('/api/job/get-all-late-jobs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

/* 
 desc: GET ALL COMPLETED JOBS
*/
export const getAllCompletedJobs = async (token) => {
  try {
    const response = await axios.get('/api/job/get-all-completed-jobs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

/* 
 desc: SEARCH JOBS BY client_name, payment_status, main_category, sub_categories, designer_tag, is_completed_status, shorter_id
*/
export const searchJobs = async (token, searchQuery) => {
  try {
    const response = await axios.get(
      `/api/job/search-jobs/?search=${searchQuery}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

/* 
 desc: UPDATE A PARTICULAR JOB'S CLIENT NAME
*/
export const updateJobClientName = async (
  token,
  id,
  admin_name,
  admin_level,
  old_client_name,
  new_client_name
) => {
  try {
    /* Check if client name has changed */
    if (old_client_name === new_client_name) {
      let errorData = { message: 'You entered the same client name' };
      return {
        ...errorData,
        isError: true,
      };
    }

    let setting = '';
    if (admin_level === 'Recorder') {
      setting = 'can_recorders_change_client_name';
    }
    if (admin_level === 'Moderator') {
      setting = 'can_moderators_change_client_name';
    }

    const response = await axios.put(
      `/api/job/update-job-data/?id=${id}&property=client_name`,
      {
        new_value: new_client_name,
        settingToBeEnforced: setting,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    createLog(token, {
      title: `UPDATE TO JOB RECORD BY ${admin_name} - ${response.data.shorter_id}`,
      info: `${admin_name} changed client name from ${old_client_name} to ${new_client_name}, Job ID: ${response.data.shorter_id}.`,
      job_id: response.data._id,
    });
    return {
      ...response.data,
      isError: false,
    };
  } catch (error) {
    return {
      ...error.response.data,
      isError: true,
    };
  }
};

/* 
 desc: UPDATE A PARTICULAR JOB'S SUB CATEGORIES
*/
export const updateJobSubCategories = async (
  token,
  id,
  admin_name,
  admin_level,
  old_subcategories,
  new_subcategories
) => {
  try {
    /* Check if subcategories has changed */
    if (old_subcategories === new_subcategories) {
      let errorData = { message: 'You entered the same sub-categories' };
      return {
        ...errorData,
        isError: true,
      };
    }
    let setting = '';
    if (admin_level === 'Recorder') {
      setting = 'can_recorders_change_job_sub_categories';
    }
    if (admin_level === 'Moderator') {
      setting = 'can_moderators_change_job_sub_categories';
    }

    const response = await axios.put(
      `/api/job/update-job-data/?id=${id}&property=sub_categories`,
      {
        new_value: new_subcategories,
        settingToBeEnforced: setting,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    createLog(token, {
      title: `UPDATE TO JOB RECORD BY ${admin_name} - ${response.data.shorter_id}`,
      info: `${admin_name} changed sub-categories from "${old_subcategories}" to "${new_subcategories}", Job ID: ${response.data.shorter_id}.`,
      job_id: response.data._id,
    });
    return {
      ...response.data,
      isError: false,
    };
  } catch (error) {
    return {
      ...error.response.data,
      isError: true,
    };
  }
};

/* 
 desc: REASSIGN JOB TO ANOTHER DESIGNER(ANOTHER D TAG)
*/
export const reassignJobToAnotherDesigner = async (
  token,
  id,
  admin_name,
  admin_level,
  old_designer_tag,
  new_designer_tag
) => {
  try {
    /* Check if designer tag has changed */
    if (old_designer_tag === new_designer_tag) {
      let errorData = { message: 'You entered the same designer tag' };
      return {
        ...errorData,
        isError: true,
      };
    }
    let setting = '';
    if (admin_level === 'Recorder') {
      setting = 'can_recorders_reassign_jobs_to_other_designers';
    }
    if (admin_level === 'Moderator') {
      setting = 'can_moderators_reassign_jobs_to_other_designers';
    }

    const response = await axios.put(
      `/api/job/update-job-data/?id=${id}&property=designer_tag`,
      {
        new_value: new_designer_tag,
        settingToBeEnforced: setting,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    createLog(token, {
      title: `UPDATE TO JOB RECORD BY ${admin_name} - ${response.data.shorter_id}`,
      info: `${admin_name} re-assigned job from Designer "${old_designer_tag}" to "${new_designer_tag}", Job ID: ${response.data.shorter_id}.`,
      job_id: response.data._id,
    });
    return {
      ...response.data,
      isError: false,
    };
  } catch (error) {
    return {
      ...error.response.data,
      isError: true,
    };
  }
};

/* 
 desc: UPDATE A PARTICULAR JOB'S ADDITIONAL INFO
*/
export const updateJobAdditionalInfo = async (
  token,
  id,
  admin_name,
  admin_level,
  old_additional_info,
  new_additional_info
) => {
  try {
    /* Check if additional info has changed */
    if (old_additional_info === new_additional_info) {
      let errorData = { message: 'You entered the same info' };
      return {
        ...errorData,
        isError: true,
      };
    }
    let setting = '';
    if (admin_level === 'Recorder') {
      setting = 'can_recorders_change_job_additional_info';
    }
    if (admin_level === 'Moderator') {
      setting = 'can_moderators_change_job_additional_info';
    }

    const response = await axios.put(
      `/api/job/update-job-data/?id=${id}&property=additional_info`,
      {
        new_value: new_additional_info,
        settingToBeEnforced: setting,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    createLog(token, {
      title: `UPDATE TO JOB RECORD BY ${admin_name} - ${response.data.shorter_id}`,
      info: `${admin_name} changed additional info from "${old_additional_info}" to "${new_additional_info}", Job ID: ${response.data.shorter_id}.`,
      job_id: response.data._id,
    });
    return {
      ...response.data,
      isError: false,
    };
  } catch (error) {
    return {
      ...error.response.data,
      isError: true,
    };
  }
};

/* 
 desc: UPDATE A PARTICULAR JOB'S MAIN CATEGORY
*/
export const updateJobMainCategory = async (
  token,
  id,
  admin_name,
  admin_level,
  old_main_category,
  new_main_category
) => {
  try {
    /* Check if additional info has changed */
    if (old_main_category === new_main_category) {
      let errorData = { message: 'You entered the same main category' };
      return {
        ...errorData,
        isError: true,
      };
    }
    let setting = '';
    if (admin_level === 'Recorder') {
      setting = 'can_recorders_change_job_main_category';
    }
    if (admin_level === 'Moderator') {
      setting = 'can_moderators_change_job_main_category';
    }

    const response = await axios.put(
      `/api/job/update-job-data/?id=${id}&property=main_category`,
      {
        new_value: new_main_category,
        settingToBeEnforced: setting,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    createLog(token, {
      title: `UPDATE TO JOB RECORD BY ${admin_name} - ${response.data.shorter_id}`,
      info: `${admin_name} changed main category from "${old_main_category}" to "${new_main_category}", Job ID: ${response.data.shorter_id}.`,
      job_id: response.data._id,
    });
    return {
      ...response.data,
      isError: false,
    };
  } catch (error) {
    return {
      ...error.response.data,
      isError: true,
    };
  }
};

/* 
 desc: UPDATE A PARTICULAR JOB'S PAYMENT STATUS
*/
export const updateJobPaymentStatus = async (
  token,
  id,
  admin_name,
  admin_level,
  old_payment_status,
  new_payment_status
) => {
  try {
    /* Check if additional info has changed */
    if (old_payment_status === new_payment_status) {
      let errorData = { message: 'You entered the same payment status' };
      return {
        ...errorData,
        isError: true,
      };
    }
    let setting = '';
    if (admin_level === 'Recorder') {
      setting = 'can_recorders_change_job_payment_status';
    }
    if (admin_level === 'Moderator') {
      setting = 'can_moderators_change_job_payment_status';
    }

    const response = await axios.put(
      `/api/job/update-job-data/?id=${id}&property=payment_status`,
      {
        new_value: new_payment_status,
        settingToBeEnforced: setting,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    createLog(token, {
      title: `UPDATE TO JOB RECORD BY ${admin_name} - ${response.data.shorter_id}`,
      info: `${admin_name} changed payment status from "${old_payment_status}" to "${new_payment_status}", Job ID: ${response.data.shorter_id}.`,
      job_id: response.data._id,
    });
    return {
      ...response.data,
      isError: false,
    };
  } catch (error) {
    return {
      ...error.response.data,
      isError: true,
    };
  }
};

/* 
 desc: UPDATE A PARTICULAR JOB'S START DATE
*/
export const updateJobStartDate = async (
  token,
  id,
  admin_name,
  admin_level,
  old_start_date,
  new_start_date
) => {
  try {
    /* Check if additional info has changed */
    if (old_start_date === new_start_date) {
      let errorData = { message: 'You entered the same start date' };
      return {
        ...errorData,
        isError: true,
      };
    }
    let setting = '';
    if (admin_level === 'Recorder') {
      setting = 'can_recorders_change_job_start_date';
    }
    if (admin_level === 'Moderator') {
      setting = 'can_moderators_change_job_start_date';
    }

    const response = await axios.put(
      `/api/job/update-job-data/?id=${id}&property=start_date`,
      {
        new_value: new_start_date,
        settingToBeEnforced: setting,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    createLog(token, {
      title: `UPDATE TO JOB RECORD BY ${admin_name} - ${response.data.shorter_id}`,
      info: `${admin_name} changed job start date from "${old_start_date}" to "${new_start_date}", Job ID: ${response.data.shorter_id}.`,
      job_id: response.data._id,
    });
    return {
      ...response.data,
      isError: false,
    };
  } catch (error) {
    return {
      ...error.response.data,
      isError: true,
    };
  }
};

/* 
 desc: UPDATE A PARTICULAR JOB'S NOTE TAG
*/
export const updateJobNoteTag = async (
  token,
  id,
  admin_name,
  admin_level,
  old_note,
  new_note
) => {
  try {
    /* Check if note has changed */
    if (old_note === new_note) {
      let errorData = { message: 'You entered the same note' };
      return {
        ...errorData,
        isError: true,
      };
    }
    let setting = '';

    if (admin_level === 'Recorder') {
      setting = 'can_recorders_change_job_note';
    }
    if (admin_level === 'Moderator') {
      setting = 'can_moderators_change_job_note';
    }

    const response = await axios.put(
      `/api/job/update-job-data/?id=${id}&property=note`,
      {
        new_value: new_note,
        settingToBeEnforced: setting,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    createLog(token, {
      title: `UPDATE TO JOB RECORD BY ${admin_name} - ${response.data.shorter_id}`,
      info: `${admin_name} changed job note from "${old_note}" to "${new_note}", Job ID: ${response.data.shorter_id}.`,
      job_id: response.data._id,
    });
    return {
      ...response.data,
      isError: false,
    };
  } catch (error) {
    return {
      ...error.response.data,
      isError: true,
    };
  }
};
