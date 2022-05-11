import axios from 'axios';

/* 
 desc: ADD NEW ADMIN
*/
export const addNewAdmin = async (token, data) => {
  try {
    const response = await axios.post(
      '/api/admin/register',
      { ...data },
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
 desc: GET ALL RECORDERS AND MODERATORS
*/
export const getAllRecordersAndModerators = async (token) => {
  try {
    const response = await axios.get(
      '/api/admin/get-all-recorders-and-moderators',
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
 desc: GET A PARTICULAR RECORDER OR MODERATOR DATA BY ID
*/
export const getRecorderOrModeratorDataById = async (token, id) => {
  try {
    const response = await axios.get(
      `/api/admin/get-recorder-or-moderator-data/?id=${id}`,
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
 desc: UPDATE A PARTICULAR RECORDER'S OR MODERATOR'S STATUS TO ACTIVE OR INACTIVE BY ID
*/
export const updateRecorderOrModeratorStatusToActiveOrInactiveById = async (
  token,
  id,
  status
) => {
  try {
    const response = await axios.put(
      `/api/admin/update-recorder-or-moderator-data/?id=${id}&updateJustStatus=true`,
      { status: status },
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
 desc: UPDATE A PARTICULAR RECORDER'S OR MODERATOR'S DATA BY ID
*/
export const updateRecorderOrModeratorDataById = async (token, id, newData) => {
  try {
    const response = await axios.put(
      `/api/admin/update-recorder-or-moderator-data/?id=${id}&updateJustStatus='false'`,
      { ...newData },
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
 desc: DELETE A PARTICULAR RECORDER OR MODERATOR BY ID
*/
export const deleteRecorderOrModeratorById = async (token, id) => {
  try {
    const response = await axios.delete(
      `/api/admin/delete-recorder-or-moderator/?id=${id}`,
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
