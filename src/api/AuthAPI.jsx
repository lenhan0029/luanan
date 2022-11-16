import axiosClient from './axiosClient';

export const login = async (body) => {
    const url = '/auth/login';
    const response = await axiosClient.post(url, body);
    if(response.data != null){
        return response.data;
    }
    console.log(response.data)
    return 404;
  };
