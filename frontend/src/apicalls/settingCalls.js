import axios from 'axios';

/* 
 desc: GET SETTINGS IN ADMIN SETTINGS PAGE
*/
export const getSettings = async (token) => {
  try {
    const response = await axios.get('/api/settings/get', {
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
desc: FETCH SETTINGS IN SETTINGS CONTEXT
 */
export const fetchSettings = async (token, dispatch) => {
  try {
    const response = await axios.get('/api/settings/get', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch({
      type: 'FETCH_SETTINGS',
      payload: response.data,
    });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

/* 
 desc: UPDATE SETTINGS
*/
export const updateSettings = async (token, settingsId, newSettings) => {
  try {
    const response = await axios.put(
      `/api/settings/update/?id=${settingsId}`,
      { ...newSettings },
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
