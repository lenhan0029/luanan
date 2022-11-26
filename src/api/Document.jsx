import axiosClient from './axiosClient';

export const getDocument = async (id_account) => {
    const url = '/document?accountid='+ id_account;
    const response = await axiosClient.get(url);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };
  export const createDocument = async (data) => {
    const url = '/document';
    const response = await axiosClient.post(url,data);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };

  export const updateDocument = async (id_document,data) => {
    const url = '/document/'+ id_document;
    const response = await axiosClient.put(url,data);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };

  export const deleteDocument = async (id_document) => {
    const url = '/document/'+ id_document;
    const response = await axiosClient.delete(url);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };
