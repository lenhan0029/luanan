import axiosClient from './axiosClient';


export const getTimeTable = async (id_account) => {
    const url = '/timetable?accountid='+ id_account;
    const response = await axiosClient.get(url);
    if(response.data != null){
        // console.log(typeof(response.data));
        return response.data;
    }
    
    return 404;
  };
