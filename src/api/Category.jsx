import axiosClient from './axiosClient';

export const getCategory = async (id_account) => {
    const url = '/category?accountid='+ id_account;
    const response = await axiosClient.get(url);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };

  export const createCategory = async (id_account,name) => {
    const url = '/category';
    const data = {
        name: name,
        id_account: id_account
    }
    const response = await axiosClient.post(url,data);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };