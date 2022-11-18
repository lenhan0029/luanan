import axiosClient from './axiosClient';

export const getTaskByProject = async (userid) => {
    const url = '/project?accountid=' + userid;
    const response = await axiosClient.get(url);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };