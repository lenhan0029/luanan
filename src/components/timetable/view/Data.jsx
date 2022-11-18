import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { Button, Modal,Badge,Empty, message, Form } from 'antd';
import {
    FormOutlined,
    CommentOutlined,LockOutlined, UserOutlined
  } from '@ant-design/icons';
import { Input } from 'antd';
import { createNewTimeTable, editNoteofSubject, getTimeTable } from '../../../api/TimeTable';
import userEvent from '@testing-library/user-event';

const userid = localStorage.getItem('userid');
export default function Data() {

    const [isLoading,setIsLoading] = useState(false);
    const [array, setArray] = useState([]);
    const [result, setResult] = useState([]);
    const [modalData,setModalData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [editModal,setEditModal] = useState();
    const [newNote, setNewNote] = useState({note: null});

    const showModal = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const onChange = (e) => {
        setNewNote({note: e.target.value});
      };
    const handleOk = () => {
        setIsLoading(!isLoading);
        
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditModal();
        setIsLoading(!isLoading);
    };
    const showModal1 = () => {
        setIsModalOpen1(true);
        
    };

    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };
    const onFinish = async (values) => {
        // console.log('Received values of form: ', values);
        const data = {
            username: values.username,
            password: values.password,
            id_account: userid
        }
        // console.log(data);
        const result = await createNewTimeTable(data);
        console.log(result);
        if(result.length != 0){
            setIsModalOpen1(false);
        //   setArray(result);
        setIsLoading(!isLoading);
        }else{
          message.error('Thông tin tài khoản không chính xác');
        }
        
      };
    useEffect(() => {
        async function getData(){
            const result = await getTimeTable(userid); 
            result.forEach(element => {
                switch (element.day) {
                    case "Hai":
                        element.day=2;
                        break;
                    case "Ba":
                        element.day=3;
                        break;
                    case "Tư":
                        element.day=4;
                        break;
                    case "Năm":
                        element.day=5;
                        break;
                    case "Sáu":
                        element.day=6;
                        break;
                    case "Bảy":
                        element.day=7;
                        break;
                    default:
                        break;
                }
            });
            // console.log(Array.isArray(result));
            setArray(result);
            return result;
        }
        getData();
        
    },[isLoading])
    useEffect(() => {
        function getTable(){
            const tb = check();
            // console.log(tb);
            setResult(tb);
        }
        getTable();
        
    },[array])
    
    
    const { TextArea } = Input;
    
    const check = () => {
        var temp = [];
        
            for (let a = 1; a < 11; a++) {
            const arr = [];
            arr.push(<td>Tiết {a}</td>)
            for (let i = 2; i < 8; i++){
            array.forEach(element => {
                if(element.day === i+1 && element.start === a){
                    let length = element.number*43 + "px";
                    let position = 125 + element.start*44 + "px";
                    arr.push(<td key={element.id}>
                                <div className='subjectContain' style={{position: 'absolute',top: position}}>
                                    <div className='subjectModel' style={{height: length}}> 
                                        <div style={{float: "right",padding: "5px 8px 0 0"}}>{element.note == null ?<FormOutlined style={{}} onClick={() => {
                                            showModal(element);
                                        }}/> :
                                         <Badge count={1} size="small" onClick={() => {
                                            showModal(element);
                                         }}><CommentOutlined style={{color: "red"}} /></Badge>}</div>
                                        <h4 style={{color: "white", paddingTop:"5px"}}>{element.name}</h4>
                                        <h5>{element.room}</h5>
                                    </div>
                                    
                                </div>
                            </td>);
                }else if(arr[i-1] == null){
                    arr.push(<td> </td>);
                }
            });
            
        }
            const item = (c) => {
                var items = [];
                c.forEach(element => {
                   items.push(element);
                })
                return items;
            };
                temp.push(<tr key={"table" + a}>{item(arr)}</tr>);
            }
            
        return temp;
    }
    const renderEditModal = (item) =>{
        return (
            <Modal title="Thông tin môn học" open={isModalOpen} onOk={() => handleOk(newNote)} onCancel={handleCancel}
                                            >
                                                <h3>Môn học: &ensp; &nbsp;  {modalData.name}</h3>
                                                <p>Thời gian: &emsp; &nbsp;  Thứ {modalData.day} tiết {modalData.start}</p>
                                                <p>Số lương tiết: &nbsp; {modalData.number}</p>
                                                <p>Phòng: &emsp; &emsp; &nbsp; {modalData.room}</p>
                                                <div style={{display: "flex"}}>
                                                    <span style={{marginRight: "3vw"}}>Ghi chú</span>
                                                    <TextArea
                                                        showCount
                                                        maxLength={250}
                                                        style={{ height: 80,width: "25vw" }}
                                                        onChange={onChange}
                                                        defaultValue={item.note}
                                                        placeholder="ghi chú..."
                                                        allowClear={true}
                                                        size={"large"}
                                                    />
                                                </div>
                                            </Modal>
        )
    }
    useEffect(() => {
            const rs =  renderEditModal(modalData);
            setEditModal(rs);
    },[modalData])
    useEffect(() => {
        if(newNote.note != null){
            async function editSubjectNote(){
            const rs = await editNoteofSubject(modalData.id,newNote);
            console.log(rs);
                if(rs != 404){
                    setIsModalOpen(false);
                    setNewNote({note: null});
                    message.success("Tạo ghi chú thành công");
                    setIsLoading(!isLoading);
                }else{
                message.error('Tạo ghi chú thất bại');
                }
        }
        editSubjectNote();
        setEditModal();
        }
    },[isLoading])
    return (
        <>
        { array.length !== 0 ? <>
        <table id='timetable' key={'timetable'}>
            <thead>
                <tr>
                    <th style={{width: "60px"}}></th>
                    <th>Thứ 2</th>
                    <th>Thứ 3</th>
                    <th>Thứ 4</th>
                    <th>Thứ 5</th>
                    <th>Thứ 6</th>
                    <th>Thứ 7</th>
                </tr>
            </thead>
            <tbody>
            {result }
            </tbody>
            <tfoot>

            </tfoot>
        </table>
        
        <div style={{
            float: "right",
            margin: "20px 4vw",
            boxShadow: "3px 3px 3px lightblue",
            
        }}>
            <Button type='primary'>Cập nhật thời khóa biểu</Button>
        </div>
        
        {/* {modalData != null ?  : ""} */}
        {editModal}
        </> : <>
        <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={
      <span>
        Thời khóa biểu chưa được cập nhật
      </span>
    }
  >
    <Button type="primary" onClick={showModal1}>Cập nhât thời khóa biểu</Button>
  </Empty>
  <Modal title="Thông tin tài khoản đào tạo" open={isModalOpen1} onCancel={handleCancel1} footer={false}>

  <Form
          name="normal_login"
          className="login-ttdt-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Mã giáo viên" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
    </Modal>
        </>}
        </>
      )
}
