import axiosClient from './axiosClient';

export const getNote = async (id_account,date) => {
    const url = '/note?accountid='+ id_account + "&date="+date;
    const response = await axiosClient.get(url);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };

  export const createNote = async (data) => {
    const url = '/note';
    const response = await axiosClient.post(url,data);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };

  export const deleteNote = async (id) => {
    const url = '/note/'+ id;
    const response = await axiosClient.delete(url);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };
  export const updateNote = async (id,data) => {
    const url = '/note/' + id;
    const response = await axiosClient.put(url,data);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };
