import axios from 'axios';
import store from '../redux/store';
import { asynclogoutUser } from '../redux/thunk/authThunk/signin.thunk';

const requestApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_HOST,
});


requestApi.interceptors.request.use((req) => {
  const authToken = JSON.parse(localStorage.getItem('adminToken'));

  if (authToken || req?.data?.authToken) {
    let tokens = req?.data?.authToken ?? '';
    let newtoken = authToken ?? tokens;
    req.headers = {
      Authorization: `Bearer ${newtoken}`,
    };
  }

  return Promise.resolve(req);
});

requestApi.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data?.meta?.status === 1) {
      return Promise.resolve(data);
    } else {
      return Promise.reject({
        status: data?.statusCode,
        message: data?.meta?.message || 'Something went wrong.',
      });
    }
  },
  async (error) => {
    console.log(error?.response?.data?.meta.message, 'error');
    if (error?.response?.status === 401) {
      store.dispatch(
        asynclogoutUser({
          device_token: store.getState()?.signin?.device_token,
          noapi: true,
        })
      );
    } else {
      const response = {
        message: 'Something went wrong.',
        status: 404,
      };

     if(error?.response?.data?.statusCode ===400){
        response.message =error?.response?.data?.meta?.message || 'Bad request.';
        response.status = error?.response?.data?.statusCode;
      }
    
      else if (error?.data?.status === 400) {
        response.message = error?.response?.message || 'Bad request.';
        response.status = error?.response?.status;
      }
    
      else if (error?.response?.status === 500) {
        response.message = error?.response?.data?.meta?.message || 'Internal server error.';
        response.status = error?.response?.data?.statusCode;
      } else if (error?.meta) {
        // Use error meta message if available
        response.message = error?.meta?.message;
      } else {
        // Set generic message based on status code
        if (error?.status !== 404 || error?.statusCode !== 404) {
          response.message = error?.message || 'Unknown error.';
          response.status = error?.status || error?.statusCode;
        } else {
          response.message = 'Service Unavailable.';
          response.status = 503;
        }
      }
      return Promise.reject(response);
    }
  }
);

export default requestApi;