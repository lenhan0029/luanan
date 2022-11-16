import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { Button, Modal,Badge } from 'antd';
import {
    FormOutlined,
    CommentOutlined
  } from '@ant-design/icons';
import { Input } from 'antd';
import { getTimeTable } from '../../../api/TimeTable';
import userEvent from '@testing-library/user-event';

export default function Data() {

    const [array, setArray] = useState([]);
    const [result, setResult] = useState([]);
    const [modalData,setModalData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (data) => {
        setIsModalOpen(true);
        setModalData(data);
        
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    useEffect(() => {
        async function getData(){
            const result = await getTimeTable(1); 
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
        
    },[])
    useEffect(() => {
        function getTable(){
            const tb = check();
            // console.log(tb);
            setResult(tb);
        }
        getTable();
        
    },[array])
    useEffect(() => {
        console.log(modalData);
    },[modalData])
    // console.log(array);
    // const onHover = () => {

    // }
    const { TextArea } = Input;
    // const onChange = (e) => {
    //     console.log('Change:', e.target.value);
    //   };
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
                                        <div style={{float: "right"}}>{element.note == null ?<FormOutlined style={{padding: "5px"}} onClick={() => {
                                            showModal(element);
                                        }}/> :
                                         <Badge count={1} size="small"><CommentOutlined style={{color: "red",padding: "5px"}} onClick={() => {
                                            showModal(element);
                                         }}/></Badge>}</div>
                                        <h4 style={{color: "white", paddingTop:"5px"}}>{element.name}</h4>
                                        <h5>{element.room}</h5>
                                        {/* <Modal title="Thông tin môn học" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                                            >
                                                <h3>Môn học: &ensp; &nbsp;  {element.name}</h3>
                                                <p>Thời gian: &emsp; &nbsp;  Thứ {element.day} tiết {element.start}</p>
                                                <p>Số lương tiết: &nbsp; {element.number}</p>
                                                <p>Phòng: &emsp; &emsp; &nbsp; {element.room}</p>
                                                <TextArea
                                                    showCount
                                                    maxLength={100}
                                                    style={{ height: 120 }}
                                                    // onChange={}
                                                    value={element.note}
                                                    placeholder="ghi chú"
                                                />
                                            </Modal> */}
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
    
    return (
        <>
        {result}
        <div>
            <Button>Cập nhật thời khóa biểu</Button>
        </div>
        {modalData != null ? <Modal title="Thông tin môn học" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                                            >
                                                <h3>Môn học: &ensp; &nbsp;  {modalData.name}</h3>
                                                <p>Thời gian: &emsp; &nbsp;  Thứ {modalData.day} tiết {modalData.start}</p>
                                                <p>Số lương tiết: &nbsp; {modalData.number}</p>
                                                <p>Phòng: &emsp; &emsp; &nbsp; {modalData.room}</p>
                                                <TextArea
                                                    showCount
                                                    maxLength={100}
                                                    style={{ height: 120 }}
                                                    // onChange={}
                                                    value={modalData.note}
                                                    placeholder="ghi chú"
                                                />
                                            </Modal> : ""}
        </>
            
      )
}
