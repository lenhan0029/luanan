import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import moment from 'moment';
import { Button, Card, Form, Input, message, Modal, Space, Timeline } from 'antd';
import { DatePicker, Popover } from 'antd';
import {
    PlusOutlined,DeleteOutlined,EditOutlined,ExclamationCircleOutlined
  } from '@ant-design/icons';
import { createNote, deleteNote, getNote, updateNote } from '../../api/NoteAPI';
import TextArea from 'antd/lib/input/TextArea';

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
                                    <p>v??? tr??: {element.location}</p>
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
          title: 'B???n c?? mu???n x??a ghi ch?? n??y?',
          icon: <ExclamationCircleOutlined />,
          onOk() {
            
            async function deleteNoteById(noteid){
                const result = await deleteNote(noteid);
                if(result != 404){
                    
                  setDate(d);
                    message.success("X??a ghi ch?? th??nh c??ng");
                }else{
                  message.error('X??a ghi ch?? th???t b???i');
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
            timeStart: values.timeStart[0].format('YYYY-MM-DDTHH:mm:ss') + "+00:00",
            timeEnd: values.timeStart[1].format('YYYY-MM-DDTHH:mm:ss')+ "+00:00",
            description: values.description,
            id_account: userid

        }
        const result = await createNote(pushData);
        console.log(result);
        if(result != 404){
            setIsModalOpen(false);
            message.success("T???o ghi ch?? th??nh c??ng");
          setDate(values.timeStart[0].format('YYYY-MM-DD'));
        }else{
          message.error('T???o ghi ch?? th???t b???i');
        }
        // console.log(pushData);
        
      };
    const onFinish1 = async (values) => {
        setDate(null);
        const pushData = {
            title: values.title,
            location: values.location,
            timeStart: values.timeStart[0].format('YYYY-MM-DDTHH:mm:ss') + "+00:00",
            timeEnd: values.timeStart[1].format('YYYY-MM-DDTHH:mm:ss')+ "+00:00",
            description: values.description,
            id_account: userid

        }
        const result = await updateNote(modalData.id,pushData);
        console.log(result);
        if(result != 404){
            setIsModalOpen1(false);
            message.success("C???p nh???t ghi ch?? th??nh c??ng");
          setDate(values.timeStart[0].format('YYYY-MM-DD'));
        }else{
          message.error('C???p nh???t ghi ch?? th???t b???i');
        }
    }
    const onDateChange = (d, dateString) => {
        setDate(dateString);
    }
    const renderEditModal = (modal) => {
        return <Modal title="Thay ?????i th??ng tin ghi ch??" open={isModalOpen1} onCancel={handleCancel1} onOk={handleOk1} footer={false}>

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
            <Form.Item label="Ti??u ?????"
            name="title"
            rules={[{ required: true, message: 'Vui l??ng nh???p ti??u ?????' }]}
            >
            <Input placeholder="Ti??u ?????" />
            </Form.Item>
            <Form.Item label="V??? tr??"
            name="location"
            rules={[{ required: true, message: 'Vui l??ng nh???p v??? tr??' }]}
            >
            <Input  placeholder="V??? tr??"/>
            </Form.Item>
            <Form.Item label="B???t ?????u"
            name="timeStart"
            >
                <RangePicker showTime format={datetimeFormat}/>
            </Form.Item>
            <Form.Item label="Chi ti???t"
            name="description"
            >
            <TextArea  placeholder="M?? t??? c??ng vi???c"/>
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft: "10vw"}}>
                S???a ghi ch??
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
        <div style={{margin: "0 5vw 5vw 0",display: "flex",justifyContent: "right"}}>
            {/* <div style={{marginLeft: "50px"}}>
                <Input type='text' placeholder='v??? tr??'/>
            </div>
            <div style={{marginLeft: "50px"}}>
                <Input type='text' placeholder='ti??u ?????'/>
            </div> */}
            <div>Ch???n ng??y</div>
            <div style={{marginLeft: "2vw"}}>
                <DatePicker value={moment(date, dateFormat)} format={dateFormat} onChange={onDateChange}/>
            </div>
            <div style={{marginLeft: "5vw"}}>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Th??m
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
        <Modal title="Th??ng tin ghi ch??" open={isModalOpen} onCancel={handleCancel} onOk={handleOk} footer={false}>

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                name="normal_login"
                className="login-ttdt-form"
                onFinish={onFinish}
            >
                <Form.Item label="Ti??u ?????"
                name="title"
                rules={[{ required: true, message: 'Vui l??ng nh???p ti??u ?????' }]}
                >
                <Input placeholder="Ti??u ?????" />
                </Form.Item>
                <Form.Item label="V??? tr??"
                name="location"
                rules={[{ required: true, message: 'Vui l??ng nh???p v??? tr??' }]}
                >
                <Input  placeholder="V??? tr??" />
                </Form.Item>
                <Form.Item label="B???t ?????u"
                name="timeStart"
                >
                    <RangePicker showTime format={datetimeFormat}/>
                </Form.Item>
                <Form.Item label="Chi ti???t"
                name="description"
                >
                <TextArea  placeholder="M?? t??? c??ng vi???c"/>
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft: "10vw"}}>
                    T???o ghi ch??
                </Button>
                </Form.Item>
            </Form>
        </Modal>
        {initialValues}
        </div>
      </>
    );
  };