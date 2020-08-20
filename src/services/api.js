import axios from 'axios';
import {getToken} from './auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json'
});

api.interceptors.request.use(
  async (config) => {
    if (getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`;
    }
    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
