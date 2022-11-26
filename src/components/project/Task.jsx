import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Tabs,Button,Modal, message, Form, Input, DatePicker, Radio, Table, Space } from 'antd';
import Item from './Item';
import { Empty } from 'antd';

import {
  EditOutlined,DeleteOutlined,PlusOutlined,ExclamationCircleOutlined
} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { getProjectById, updateProject } from '../../api/ProjectAPI';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import { createTask, deleteTask, getTaskByProject, updateTask } from '../../api/TaskAPI';

const dateFormat = 'YYYY-MM-DD';
const datetimeFormat = 'YYYY-MM-DD HH:mm';

const userid = localStorage.getItem('userid');
const { confirm } = Modal;
export default function Task() {
  
  const [project, setProject] = useState({});
  const [tasks,setTasks] = useState([]);
  const [prjectForm, setProjectForm] = useState(<></>);
  const [taskTable,setTaskTable] = useState(<><Empty description={false}/></>);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [modalData,setModalData] = useState({});
  const [initialValues,setInitialValue] = useState();
  const [isloading,setIsloading] = useState(false);

  const { RangePicker } = DatePicker;
  const params = useParams();
  const [form] = Form.useForm();
  // console.log(params.id);

  const column = [
    {
      title: 'Tên',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
      width: "30%"
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'timeStart',
      width: "20%",
      render: (_, record) => (
        record.timeStart.slice(0,10) + " " + record.timeStart.slice(11,16)
      ),
      // sorter: (a, b) => a.timeStart.length - b.name.length,
      // sortDirections: ['descend'],
    },
    {
      title: 'Ngày Kết thúc',
      dataIndex: 'timeEnd',
      render: (_, record) => (
        record.timeEnd.slice(0,10) + " " + record.timeEnd.slice(11,16)
      ),
      width: "20%"
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width:"10%",
      filters: [
        {
          text: 'Đang chờ',
          value: 'Đang chờ',
        },
        {
          text: 'Đang thực hiện',
          value: 'Đang thực hiện',
        },
        {
          text: 'Hoàn thành',
          value: 'Hoàn thành',
        }
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (_, record) => 
        {
          switch (record.status) {
                case 'waiting':
                  return 'Đang chờ';
                case 'inprogress':
                  return 'Đang thực hiện';
                case 'done':
                  return 'Hoàn thành';
                default:
                  break;
              }
        }
      
  
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      width: "10%",
      filters: [
        {
          text: 'Thấp',
          value: 'Thấp'
        },
        {
          text: 'Trung bình',
          value: 'Trung bình',
        },
        {
          text: 'Cao',
          value: 'Cao',
        }
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (_, record) => 
        {
          switch (record.priority) {
                case 'low':
                  return 'Thấp';
                case 'medium':
                  return 'Trung bình';
                case 'high':
                  return 'Cao';
                default:
                  break;
              }
        }
    },
    {
      title: 'Sửa',
      width:"5%",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => {showModalwithData(record)}}/>
        </Space>
      ),
    },
    {
      title: 'Xóa',
      width:"5%",
      render: (_, record) => (
        <Space size="middle">
          <DeleteOutlined onClick={() => {showConfirm(record.id)}}/>
          {/* <a>{record.id}</a> */}
        </Space>
      ),
    }
  ]
  useEffect(() => {
    async function getData(){
      const result = await getProjectById(params.id);
      if(result != 404){
        setProject(result);
        // console.log("result"+ result);
    }
    }
    getData();
    async function getTask(){
      const result = await getTaskByProject(params.id);
      if(result != 404){
        setTasks(result);
        console.log(result);
    }
    }
    getTask();
  },[isloading])
  useEffect(() => {
    
  })
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
   
    const onFinish = async (values) => {
      const pushData = {
        name: values.name,
        company: values.company,
        timeStart: values.timeStart[0].format('YYYY-MM-DD'),
        timeEnd: values.timeStart[1].format('YYYY-MM-DD'),
        status: values.status != undefined ? values.status : "waiting",
        priority: values.priority != undefined ? values.priority : "low",
        description: values.description,
        id_account: userid

    }
    const result = await updateProject(params.id,pushData);
    // console.log(result);
    if(result != 404){
        message.success("Cập nhật dự án thành công");
        setProject(result)
        
    }else{
      message.error('Cập nhật thất bại');
    }
    // console.log(pushData);
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
                moment(p.timeStart,dateFormat),
                moment(p.timeEnd,dateFormat),
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
                <RangePicker format={dateFormat}/>
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
            <TextArea  placeholder="Mô tả dự án"/>
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
    // console.log(project);
    if(Object.keys(project).length !== 0){
      const projectDetail = renderProject(project);
      setProjectForm(projectDetail);
    }
  },[project])
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
  }
  const table = (t) =>{
    return (
      <div style={{width: "74vw"}}>
        <Table size='small' columns={column} dataSource={t} onChange={onChange}/>
      </div>
    )
  }
  
  const showModal1 = () => {
    setIsModalOpen1(true);
  }

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  }
  useEffect(() => {
    // console.log(project);
    if(tasks.length !== 0){
      const projectTask = table(tasks);
      setTaskTable(projectTask);
    }
  },[tasks])
  const items = new Array(2).fill(null).map((_, i) => {
    var id = String(i + 1);
    return {
      label: checknav(id),
      key: id,
      children: i == 0 ? prjectForm : 
      <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal1} style={{float: "right", margin: "0 4vw 20px 0"}}>
            Thêm
            </Button>
            {taskTable}
      </>
    };
  });
  //task
  const showModalwithData = (d) => {
    setModalData(d);
    setIsModalOpen(true);
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
      setIsModalOpen(false);
      setInitialValue();
  };
  const onFinish1 = async (values) => {
    const pushData = {
      name: values.name,
      timeStart: values.timeStart[0].format('YYYY-MM-DDTHH:mm:00+00:00'),
      timeEnd: values.timeStart[1].format('YYYY-MM-DDTHH:mm:00+00:00'),
      status: values.status != undefined ? values.status : "waiting",
      priority: values.priority != undefined ? values.priority : "low",
      description: values.description,
      id_project: params.id

  }
  const result = await updateTask(values.taskid,pushData);
  // console.log(values);
  if(result != 404){
      message.success("Cập nhật dự án thành công");
      setIsModalOpen(false);
      setInitialValue();
      setIsloading(!isloading);
      
  }else{
    message.error('Cập nhật thất bại');
  }
  // console.log(pushData);
  }
  const renderEditModal = (modal) => {
    // console.log(modal);
    return <Modal title="Thay đổi thông tin công việc" open={isModalOpen} onCancel={handleCancel} onOk={handleOk} footer={false}>

    <Form
        initialValues={{
            taskid: modal.id,
            name: modal.name,
            timeStart: [
                moment(modal.timeStart,datetimeFormat),
                moment(modal.timeEnd,datetimeFormat),
              ],
              status: modal.status,
              priority: modal.priority,
            description: modal.description
        }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        name="normal_login"
        className="login-ttdt-form"
        onFinish={onFinish1}
    >
      <Form.Item name="taskid" hidden><Input /></Form.Item>
        <Form.Item label="Công việc"
        name="name"
        rules={[{ required: true, message: 'Công việc không được để trống' }]}
        >
        <Input placeholder="Công việc" />
        </Form.Item>
        <Form.Item label="Bắt đầu"
        name="timeStart"
        >
            <RangePicker showTime format={datetimeFormat}/>
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
        <TextArea  placeholder="Mô tả công việc"/>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft: "10vw"}}>
            Sửa công việc
        </Button>
        </Form.Item>
    </Form>
</Modal>
}
useEffect(() => {
  var modal = renderEditModal(modalData);
  if(Object.keys(modalData).length !== 0){
    setModalData({});
  }
  setInitialValue(modal);
},[modalData])

const onFinish2 = async (values) => {
  const pushData = {
    name: values.name,
    timeStart: values.timeStart[0].format('YYYY-MM-DDTHH:mm:00+00:00'),
    timeEnd: values.timeStart[1].format('YYYY-MM-DDTHH:mm:00+00:00'),
    status: values.status == undefined ? "waiting" : values.status,
    priority: values.priority == undefined ? "low" : values.priority,
    description: values.description,
    id_project: params.id

}
// console.log(pushData);
const result = await createTask(pushData);
// console.log(values);
if(result != 404){
    message.success("Thêm dự án thành công");
    setIsModalOpen1(false);
    setIsloading(!isloading);
    form.resetFields();
}else{
  message.error('Thêm thất bại');
}

}
const showConfirm = (id) => {
  confirm({
    title: 'Bạn có muốn xóa công việc này?',
    icon: <ExclamationCircleOutlined />,
    onOk() {
      
      async function deleteNoteById(noteid){
          const result = await deleteTask(noteid);
          if(result != 404){
              const arr = tasks.filter(function(value,index,arr){
                return value != tasks.find(x => x.id === noteid)
              })
              setTasks(arr);
              message.success("Xóa ghi chú thành công");
          }else{
            message.error('Xóa ghi chú thất bại');
          }
      }
      deleteNoteById(id);
    },
    onCancel() {
      setIsloading(!isloading);
    },
  });
  setIsloading(!isloading);
};
  return (
    <div className="card-container">
      <Tabs type="card" items={items} />
      {initialValues}

      <Modal title="Thêm công việc" open={isModalOpen1} onCancel={handleCancel1} footer={false}>

    <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        name="normal_login"
        className="login-ttdt-form"
        onFinish={onFinish2}
    >
        <Form.Item label="Công việc"
        name="name"
        rules={[{ required: true, message: 'Công việc không được để trống' }]}
        >
        <Input placeholder="Công việc" />
        </Form.Item>
        <Form.Item label="Bắt đầu"
        name="timeStart"
        >
            <RangePicker showTime format={datetimeFormat}/>
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
        <TextArea  placeholder="Mô tả công việc"/>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft: "10vw"}}>
            Thêm công việc
        </Button>
        </Form.Item>
    </Form>
</Modal>
  </div>
  )
    }