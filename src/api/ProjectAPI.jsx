import axiosClient from './axiosClient';

export const createProject = async (data) => {
    const url = '/project';
    const response = await axiosClient.post(url,data);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };

  export const getProject = async (userid) => {
    const url = '/project?accountid=' + userid;
    const response = await axiosClient.get(url);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };
  export const getProjectById = async (projectid) => {
    const url = '/project/' + projectid;
    const response = await axiosClient.get(url);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };
  export const updateProject = async (projectid,data) => {
    const url = '/project/' + projectid;
    const response = await axiosClient.put(url,data);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };
