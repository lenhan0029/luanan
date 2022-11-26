import axiosClient from './axiosClient';

export const getTaskByProject = async (taskid) => {
    const url = '/task?projectid=' + taskid;
    const response = await axiosClient.get(url);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };
  export const updateTask = async (taskid,data) => {
    const url = '/task/' + taskid;
    const response = await axiosClient.put(url,data);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };

  export const createTask = async (data) => {
    const url = '/task';
    const response = await axiosClient.post(url,data);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };

  export const deleteTask = async (data) => {
    const url = '/task/' + data;
    const response = await axiosClient.delete(url);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };
  