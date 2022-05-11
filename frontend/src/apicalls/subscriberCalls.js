import axios from 'axios';

/* 
 desc: ADD NEW SUBSCRIBER
*/
export const addNewSubscriber = async (token, data) => {
  try {
    const response = await axios.post(
      '/api/subscriber/add',
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
 desc: GET ALL SUBSCRIBERS
*/
export const getAllSubscribers = async (token) => {
  try {
    const response = await axios.get('/api/subscriber/get-all-subscribers', {
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
 desc: GET A PARTICULAR SUBSCRIBER DATA BY ID
*/
export const getSubscriberDataById = async (token, id) => {
  try {
    const response = await axios.get(
      `/api/subscriber/get-subscriber-data/?id=${id}`,
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
 desc: UPDATE A PARTICULAR SUBSCRIBERS STATUS BACK TO ACTIVE AFTER PAYMENT/SUBSCRIPTION
*/
export const updatedSubscriberStatusToActiveById = async (
  token,
  id,
  newSubscriptionDate,
  newSubscriptionDatesArray
) => {
  try {
    console.log(newSubscriptionDatesArray);
    const response = await axios.put(
      `/api/subscriber/update-subscriber-data/?id=${id}&updateJustStatus=true`,
      {
        lastSubscriptionDate: newSubscriptionDate,
        newSubscriptionDatesArray: newSubscriptionDatesArray,
      },
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
 desc: UPDATE A PARTICULAR SUBSCRIBER'S DATA BY ID
*/
export const updateSubscriberDataById = async (token, id, newData) => {
  try {
    const response = await axios.put(
      `/api/subscriber/update-subscriber-data/?id=${id}&updateJustStatus=false`,
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
 desc: GET ALL ACTIVE SUBSCRIBERS
*/
export const getAllActiveSubscribers = async (token) => {
  try {
    const response = await axios.get(
      '/api/subscriber/get-all-active-subscribers',
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
 desc: GET ALL ALMOST EXPIRED SUBSCRIBERS
*/
export const getAllAlmostExpiredSubscribers = async (token) => {
  try {
    const response = await axios.get(
      '/api/subscriber/get-all-almostexpired-subscribers',
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
 desc: GET ALL EXPIRED SUBSCRIBERS
*/
export const getAllExpiredSubscribers = async (token) => {
  try {
    const response = await axios.get(
      '/api/subscriber/get-all-expired-subscribers',
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
 desc: GET 20 LATEST SUBSCRIBERS
*/
export const getLatestSubscribers = async (token) => {
  try {
    const response = await axios.get('/api/subscriber/get-latest-subscribers', {
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
 desc: SEARCH SUBSCRIBERS BY name, phone, telegram, email
*/
export const searchSubscribers = async (token, searchQuery) => {
  try {
    const response = await axios.get(
      `/api/subscriber/search-subscribers/?search=${searchQuery}`,
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
