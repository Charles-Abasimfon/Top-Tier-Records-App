import axios from 'axios';

/* 
 desc: GET LOGS
*/
export const getLogs = async (token) => {
  try {
    const response = await axios.get('/api/logs/get-all', {
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
 desc: GET LOGS FOR A PARTICULAR JOB BY ID
*/
export const getLogsForJob = async (token, id) => {
  try {
    const response = await axios.get(`/api/logs/get-logs-by-job-id?id=${id}`, {
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
 desc: CREATE LOG
*/
export const createLog = async (token, content) => {
  try {
    const response = await axios.post(
      '/api/logs/create',
      {
        content,
      },
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
 desc: SEARCH LOGS
*/
export const searchLogs = async (token, searchQuery) => {
  try {
    const response = await axios.get(
      `/api/logs/search-logs/?search=${searchQuery}`,
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
