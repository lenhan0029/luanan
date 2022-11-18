import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import moment from 'moment';
import { Button, Card, Form, Input, message, Modal, Space, Timeline } from 'antd';
import { DatePicker, Popover } from 'antd';
import {
    PlusOutlined,DeleteOutlined,EditOutlined,ExclamationCircleOutlined
  } from '@ant-design/icons';
import { createNote, deleteNote, getNote } from '../../api/NoteAPI';

  const dateFormat = 'YYYY-MM-DD';
  const datetimeFormat = 'YYYY-MM-DD HH:mm';
  const today = () => {
    var d = new Date();
    var dd = String(d.getDate()).padStart(2, '0');
    var mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = d.getFullYear();

    var rs = yyyy + "-" + mm + "-" + dd;
    return rs;
  }
  const userid = localStorage.getItem('userid');
  const { confirm } = Modal;


export default function NoteDay() {

    const day = today();
    const [date,setDate] = useState(day);
    const [data,setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [modalData,setModalData] = useState({});
    const [initialValues,setInitialValue] = useState();

    const { RangePicker } = DatePicker;
    
    useEffect(() =>{
            const searchDate = date+ "T00:00:00";
            async function getData(){
                const result = await getNote(userid,searchDate);
                if(result != 404){
                    setData(result);
                }else{
                    console.log("hi");
                }  
                return result;
            }
            getData();
    },[date])
    const [item,setItem] = useState([]);
    useEffect(() => {
        if(data !== undefined){
            function getItems(){
                const tb = showData();
                setItem(tb);
            }
            getItems();
        }
        
    },[data])
    const showData = () => {
        var arr = [];
        // for (let i = 0; i < 23; i++) {
            console.log(data);
            data.forEach(element => {
                let starttime = element.timeStart + "";
                console.log(starttime);
                let hour = starttime.charAt(11) + "" + starttime.charAt(12);
                let time = starttime.charAt(14) + "" + starttime.charAt(15);
                    arr.push(
                        <Timeline.Item label={hour + ":" + time} style={{marginBottom: 10}}>
                            <Card title={element.title} extra={<DeleteOutlined onClick={() => showConfirm(element.id)}/>}
                            bordered={true} style={{ width: "30vw",height: "8vw", marginBottom: 10 }}>
                                <div style={{display: "flex"}} className="note-content">
                                    <p>vị trí: {element.location}</p>
                                    <EditOutlined className='edit-icon' onClick={() => {showModalwithData(element)}}/>
                                </div>
                            </Card>
                        </Timeline.Item>)
            });
            
        // }
        return arr;
    }
    
    const showModal = () => {
        setIsModalOpen(true);
        
    };
    const showModalwithData = (d) => {
        setModalData(d);
        setIsModalOpen1(true);
    }
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        
    };
    const handleOk1 = () => {
        setIsModalOpen1(false);
    };

    const handleCancel1 = () => {
        setIsModalOpen1(false);
        setInitialValue();
    };
    const showConfirm = (id) => {
        const d = date;
        setDate(null);
        confirm({
          title: 'Bạn có muốn xóa ghi chú này?',
          icon: <ExclamationCircleOutlined />,
          onOk() {
            
            async function deleteNoteById(noteid){
                const result = await deleteNote(noteid);
                if(result != 404){
                    
                    message.success("Xóa ghi chú thành công");
                  setDate(d);
                }else{
                  message.error('Tạo ghi chú thất bại');
                  setDate(d);
                }
            }
            deleteNoteById(id);
            console.log(item);
          },
          onCancel() {
            console.log(item);
            setDate(d);
          },
        });
      };
    const onFinish = async (values) => {
        setDate(null);
        const pushData = {
            title: values.title,
            location: values.location,
            timeStart: values.timeStart[0].format('YYYY-MM-DDTHH:mm:ss') + "+07:00",
            timeEnd: values.timeStart[1].format('YYYY-MM-DDTHH:mm:ss')+ "+07:00",
            description: values.description,
            id_account: userid

        }
        const result = await createNote(pushData);
        console.log(result);
        if(result != 404){
            setIsModalOpen(false);
            message.success("Tạo ghi chú thành công");
          setDate(values.timeStart[0].format('YYYY-MM-DD'));
        }else{
          message.error('Tạo ghi chú thất bại');
        }
        // console.log(pushData);
        
      };
    const onFinish1 = (values) => {
        console.log(values);
    }
    const onDateChange = (d, dateString) => {
        setDate(dateString);
    }
    const renderEditModal = (modal) => {
        return <Modal title="Thay đổi thông tin ghi chú" open={isModalOpen1} onCancel={handleCancel1} onOk={handleOk1} footer={false}>

        <Form
            initialValues={{
                title: modal.title,
                location: modal.location,
                timeStart: [
                    moment(modal.timeStart,datetimeFormat),
                    moment(modal.timeEnd,datetimeFormat),
                  ],
                description: modal.description
            }}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            name="normal_login"
            className="login-ttdt-form"
            onFinish={onFinish1}
        >
            <Form.Item label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
            >
            <Input placeholder="Tiêu đề" />
            </Form.Item>
            <Form.Item label="Vị trí"
            name="location"
            rules={[{ required: true, message: 'Vui lòng nhập vị trí' }]}
            >
            <Input  placeholder="Vị trí"/>
            </Form.Item>
            <Form.Item label="Bắt đầu"
            name="timeStart"
            >
                <RangePicker showTime format={datetimeFormat}/>
            </Form.Item>
            <Form.Item label="Chi tiết"
            name="description"
            >
            <Input  placeholder="Mô tả công việc"/>
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft: "10vw"}}>
                Sửa ghi chú
            </Button>
            </Form.Item>
        </Form>
    </Modal>
    }
    
    useEffect(() => {
        var modal = renderEditModal(modalData);
        setInitialValue(modal);
    })
    return (
      <>
        <div style={{marginBottom: 50,display: "flex",justifyContent: "right"}}>
            <div style={{marginLeft: "50px"}}>
                <Input type='text' placeholder='vị trí'/>
            </div>
            <div style={{marginLeft: "50px"}}>
                <Input type='text' placeholder='tiêu đề'/>
            </div>
            <div style={{marginLeft: "50px"}}>
                <DatePicker value={moment(date, dateFormat)} format={dateFormat} onChange={onDateChange}/>
            </div>
            <div style={{marginLeft: "50px"}}>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Thêm
            </Button>
            </div>
        </div>
        <div style={{display: "flex"}}>
            <div>
                <img src={process.env.PUBLIC_URL + '/note.png'} alt="Logo" style={{width: "25vw"}} />
            </div>
            <div>
            <Timeline mode="left" style={{float: "left",width: "40%"}}>
                {item}
            </Timeline>
            </div>
        </div>
        <div>
        <Modal title="Thông tin ghi chú" open={isModalOpen} onCancel={handleCancel} onOk={handleOk} footer={false}>

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                name="normal_login"
                className="login-ttdt-form"
                onFinish={onFinish}
            >
                <Form.Item label="Tiêu đề"
                name="title"
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                >
                <Input placeholder="Tiêu đề" />
                </Form.Item>
                <Form.Item label="Vị trí"
                name="location"
                rules={[{ required: true, message: 'Vui lòng nhập vị trí' }]}
                >
                <Input  placeholder="Vị trí" />
                </Form.Item>
                <Form.Item label="Bắt đầu"
                name="timeStart"
                >
                    <RangePicker showTime format={datetimeFormat}/>
                </Form.Item>
                <Form.Item label="Chi tiết"
                name="description"
                >
                <Input  placeholder="Mô tả công việc"/>
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft: "10vw"}}>
                    Tạo ghi chú
                </Button>
                </Form.Item>
            </Form>
        </Modal>
        {initialValues}
        </div>
      </>
    );
  };