import axios from 'axios';
import queryString from 'query-string';
import { URL_SERVER } from '../utils/urlPath';

const token =localStorage.getItem('token');
const axiosClient = axios.create({
  baseURL: URL_SERVER,
  headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer `+ token
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    switch (error.response.status) {
      case 500:
        console.log('Server error');
        break;
      default:
        console.log('Something went wrong');
        console.log('--------------------');
        console.log(`URL: ${error.response.config.url}`);
        console.log(`HTTP Code: ${error.response.status}`);
        console.log(`HTTP Message: ${error.response.statusText}`);
        console.log('-------------------- ');
        return error.response;
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
