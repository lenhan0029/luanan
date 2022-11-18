import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Tabs,Button,Modal, message, Form, Input, DatePicker, Radio } from 'antd';
import Item from './Item';
import {
  PlusOutlined,FireOutlined,WarningOutlined,PaperClipOutlined
} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../../api/ProjectAPI';
import moment from 'moment';

const datetimeFormat = 'YYYY-MM-DD';
export default function Task() {
  const [project, setProject] = useState({});
  const [tasks,setTasks] = useState([]);
  const [prjectForm, setProjectForm] = useState(<></>);

  const { RangePicker } = DatePicker;
  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    async function getData(){
      const result = await getProjectById(params.id);
      if(result != 404){
        setProject(result);
        // console.log("result"+ result);
    }else{
      message.error('Lấy dữ liệu thất bại');
    }
    }
    getData();
    
  },[])
  const checknav = (data) =>{
    let title = "";
    switch (data) {
      case "1":
        title = "Tổng quan";
        break;
      case "2":
          title = "Công việc";
          break;
      default:
        break;
    }
    return title;
  }
    // console.log(arr);
   
    const onFinish = () => {

    }
  const renderProject = (p) => {
    return (
      <div style={{display: "flex"}}>
        <div style={{ width: "50vw",paddingTop: 50}}>
        <Form
            initialValues={{
              name: p.name,
              company: p.company,
              status: p.status,
              priority: p.priority,
              timeStart: [
                moment(p.timeStart,datetimeFormat),
                moment(p.timeEnd,datetimeFormat),
              ],
              description: p.description
            }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            name="normal_login"
            className="login-ttdt-form"
            onFinish={onFinish}
        >
            <Form.Item label="Tên dự án"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên dự án' }]}
            >
            <Input placeholder="Tên dự án" />
            </Form.Item>
            <Form.Item label="Công ty"
            name="company"
            rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}
            >
            <Input  placeholder="Vị trí" />
            </Form.Item>
            <Form.Item label="Thời gian"
            name="timeStart"
            >
                <RangePicker format={datetimeFormat}/>
            </Form.Item>
            <Form.Item label="Trạng thái"
            name="status"
            >
                <Radio.Group defaultValue="waiting">
                  <Radio value="waiting">khởi tạo</Radio>
                  <Radio value="inprogress">thực hiện</Radio>
                  <Radio value="done">hoàn thành</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Độ ưu tiên"
            name="priority"
            >
                <Radio.Group defaultValue="low">
                  <Radio value="low">Thấp</Radio>
                  <Radio value="medium">Trung bình</Radio>
                  <Radio value="high">Cao</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Chi tiết"
            name="description"
            >
            <Input  placeholder="Mô tả dự án"/>
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft: "15vw"}}>
                chỉnh sửa dự án
            </Button>
            </Form.Item>
        </Form>
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + '/backgroundv.png'} alt="Logo" style={{width: "25vw"}} />
        </div>
      </div>
    )
  }
  useEffect(() => {
    console.log(project);
    if(Object.keys(project).length !== 0){
      const projectDetail = renderProject(project);
      setProjectForm(projectDetail);
    }
  },[project])
  
  const items = new Array(2).fill(null).map((_, i) => {
    var id = String(i + 1);
    return {
      label: checknav(id),
      key: id,
      children: i == 0 ? prjectForm : "work"
    };
  });
  
  return (
    <div className="card-container">
      <Tabs type="card" items={items} />
  </div>
  )
    }