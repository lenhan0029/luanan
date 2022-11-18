import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Tabs,Button,Modal, DatePicker, Form, Input, message, Select,Radio } from 'antd';
import Item from './Item';
import {
  PlusOutlined,FireOutlined,WarningOutlined,PaperClipOutlined
} from '@ant-design/icons';
import { createProject, getProject } from '../../api/ProjectAPI';


// const data = [{id: 1, name: "quản lý ghi chú", priority: 1, status: 3},
// {id: 2, name: "quản lý ghi chú 1", priority: 2, status: 1},
// {id: 3, name: "quản lý ghi chú 2", priority: 3, status: 2},
// {id: 4, name: "quản lý ghi chú 3", priority: 1, status: 3},
// {id: 5, name: "quản lý ghi chú 4", priority: 2, status: 1},
// {id: 6, name: "quản lý ghi chú 5", priority: 3, status: 2},
// {id: 7, name: "quản lý ghi chú 6", priority: 1, status: 3},
// {id: 8, name: "quản lý ghi chú 7", priority: 2, status: 1},
// {id: 9, name: "quản lý ghi chú 8", priority: 2, status: 1},
// {id: 12, name: "quản lý ghi chú 11", priority: 3, status: 1},
// {id: 13, name: "quản lý ghi chú 21", priority: 1, status: 2},
// {id: 14, name: "quản lý ghi chú 31", priority: 2, status: 3},
// {id: 15, name: "quản lý ghi chú 41", priority: 3, status: 1},
// {id: 16, name: "quản lý ghi chú 51", priority: 2, status: 2},
// {id: 17, name: "quản lý ghi chú 61", priority: 2, status: 3},
// {id: 18, name: "quản lý ghi chú 71", priority: 3, status: 1},
// {id: 19, name: "quản lý ghi chú 81", priority: 1, status: 1},
// {id: 22, name: "quản lý ghi chú 11", priority: 2, status: 2},
// {id: 23, name: "quản lý ghi chú 12", priority: 3, status: 3},
// {id: 24, name: "quản lý ghi chú 13", priority: 1, status: 3},
// {id: 25, name: "quản lý ghi chú 14", priority: 2, status: 1},
// {id: 26, name: "quản lý ghi chú 15", priority: 3, status: 3},
// {id: 27, name: "quản lý ghi chú 16", priority: 1, status: 2},
// {id: 28, name: "quản lý ghi chú 17", priority: 2, status: 3},
// {id: 29, name: "quản lý ghi chú 18", priority: 2, status: 2},
// ]
const userid = localStorage.getItem('userid');
const datetimeFormat = 'YYYY-MM-DD';
const { RangePicker } = DatePicker;

export default function Project() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [data, setData] = useState([]);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
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
    const result = await createProject(pushData);
    console.log(result);
    if(result != 404){
        setOpen(false);
        message.success("Tạo ghi chú thành công");
        setData([...data,result])
        
    }else{
      message.error('Tạo ghi chú thất bại');
    }
    console.log(pushData);
    
  };
  useEffect(() => {
    async function getData(){
      const result = await getProject(userid);
      if(result != 404){
        setData(result);
        console.log("result"+ result);
    }
    }
    getData();
    
  },[])
  console.log(data);
  const checknav = (data) =>{
    let title = "";
    switch (data) {
      case "waiting":
        title = "Đang chờ";
        break;
      case "inprogress":
          title = "Đang thực hiện";
          break;
      case "done":
          title = "Đã hoàn thành";
        break;
      default:
        break;
    }
    return title;
  }
  const renderStatus= (id) => {
    let arr = [];
    data.forEach(e => {
      if(e.status == id){
        arr.push(e);
      }
    });
    // console.log(arr);
    return (
      <>
      <div className='project-item'>
        <h3><PaperClipOutlined style={{color: "green"}}/>Thấp</h3>
        <Item data={arr} priority="low"/>
      </div>
      <div  className='project-item'>
        <h3> <WarningOutlined style={{color: "orange"}}/> Trung bình</h3>
        <Item data={arr} priority="medium"/>
      </div>
      <div  className='project-item'>
        <h3><FireOutlined style={{color: "red"}}/> Cao</h3>
        <Item data={arr} priority="high"/>
      </div>
      </>
    )
  }
  const items = new Array(3).fill(null).map((_, i) => {
    var status = String(i);
    var priority = String(i);
    switch (i) {
      case 0:
        status="waiting";
        priority="low";
        break;
      case 1:
          status="inprogress";
          priority="medium";
          break;
      case 2:
            status="done";
            priority="high";
            break;
      default:
        break;
    }
    return {
      label: checknav(status),
      key: priority,
      children: renderStatus(status)
    };
  });
  return (
    <div className="card-container">
      <div style={{
        float: "right"
      }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Thêm
        </Button>
      </div>
      {/* ADD modal */}
      <Modal title="Thông tin dự án" open={open} onCancel={handleCancel} onOk={handleOk} footer={false}>

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
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
                <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft: "10vw"}}>
                    Tạo dự án
                </Button>
                </Form.Item>
            </Form>
        </Modal>
      <Tabs type="card" items={items} />
  </div>
  )
}
