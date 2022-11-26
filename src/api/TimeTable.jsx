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
  export const createNewTimeTable = async (data) => {
    const url = '/timetable';
    const response = await axiosClient.post(url,data);
    if(response.data != null){
        // console.log(typeof(response.data));
        return response.data;
    }
    
    return 404;
  };
  export const editNoteofSubject = async (idsubject,note) => {
    const url = '/timetable?subjectid='+ idsubject;
    const response = await axiosClient.put(url,note);
    if(response.status == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    
    return 404;
  };
  export const updateTimeTable = async (data) => {
    const url = '/timetable/update';
    const response = await axiosClient.post(url,data);
    if(response.data == 200){
        // console.log(typeof(response.data));
        return response.data;
    }
    return 404;
  };
