import axiosClient from './axiosClient';

export const login = async (body) => {
    const url = '/api/Security/login';
    const response = await axiosClient.post(url, body);
    // if (response.status === 401) {
    //   return 401;
    // } else if (response.status === 'success') {
    //   return response.data;
    // } else if (response.status === 500) {
    //   return 500;
    // } else {
    //   return 404;
    // }
    if(response != null){
        return response;
    }
    return 404;
  };
