import axios from 'axios';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from '../context/authContext/AuthActions';
import { fetchSettings } from '../apicalls/settingCalls';

/* 
 desc: LOGIN ADMIN
*/
export const login = async (admin, dispatch, dispatchSettings) => {
  dispatch(loginStart());
  try {
    const response = await axios.post('/api/admin/login', admin);
    //Check if admin is a Recorder and has been suspended
    if (response.data.status === 'Suspended') {
      const errorMsg =
        'Your account has been suspended. Please contact the administrator.';
      dispatch(loginFailure(errorMsg));
    } else {
      fetchSettings(response.data.token, dispatchSettings);
      dispatch(loginSuccess(response.data));
    }
  } catch (error) {
    const errorMsg = error.response.data.message;
    dispatch(loginFailure(errorMsg));
  }
};

/* 
 desc: GET ADMIN DATA
*/
export const getLoggedInAdminData = async (token) => {
  try {
    const response = await axios.get('/api/admin/get-logged-in-admin-data', {
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
 desc: UPDATE LOGGED IN ADMIN DATA
*/
export const updateLoggedInAdminData = async (token, newData, dispatch) => {
  try {
    const response = await axios.put(
      '/api/admin/update-logged-in-admin-data',
      { ...newData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(loginSuccess(response.data));
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
 desc: UPDATE LOGGED IN ADMIN PASSWORD
*/
export const updateLoggedInAdminPassword = async (token, data, dispatch) => {
  try {
    const response = await axios.put(
      '/api/admin/update-logged-in-admin-password',
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(logout());
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
