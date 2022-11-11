import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Button, Modal,Badge } from 'antd';
import {
    FormOutlined,
    CommentOutlined
  } from '@ant-design/icons';
import { Input } from 'antd';

export default function Data(row) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // const onHover = () => {

    // }
    const { TextArea } = Input;
    // const onChange = (e) => {
    //     console.log('Change:', e.target.value);
    //   };
    const array = [{},
        {id: 5, name: "Cơ sở dữ liệu phân tán",thu: 6, tiet: 5,soluong: 2,phong: "A403",note: "kt"},
        {id: 6, name: "lập trình mạng",thu: 4, tiet: 4,soluong: 3,phong: "E304",note: ""}];
    const check = (data) => {
        var arr = [];
        arr.push(<td>Tiết {data.row}</td>)
        for (let i = 2; i < 8; i++){

            array.forEach(element => {
                if(element.thu === i+1 && element.tiet === data.row){
                    let length = element.soluong*44 + "px";
                    let position = 112 + element.tiet*47 + "px";
                    arr.push(<td key={element.id}>
                                <div className='subjectContain' style={{position: 'absolute',top: position}}>
                                    <div className='subjectModel' style={{height: length}}> 
                                        <div style={{float: "right"}}>{element.note == "" ?<FormOutlined style={{padding: "5px"}} onClick={showModal}/> :
                                         <Badge count={1} size="small"><CommentOutlined style={{color: "red",padding: "5px"}} onClick={showModal}/></Badge>}</div>
                                        <h3 style={{color: "white", paddingTop:"5px"}}>{element.name}</h3>
                                        <h4>{element.phong}</h4>
                                    </div>
                                    <Modal title="Thông tin môn học" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                                    >
                                        <h3>Môn học: &ensp; &nbsp;  {element.name}</h3>
                                        <p>Thời gian: &emsp; &nbsp;  Thứ {element.thu} tiết {element.tiet}</p>
                                        <p>Số lương tiết: &nbsp; {element.soluong}</p>
                                        <p>Phòng: &emsp; &emsp; &nbsp; {element.phong}</p>
                                        <TextArea
                                            showCount
                                            maxLength={100}
                                            style={{ height: 120 }}
                                            // onChange={}
                                            value={element.note}
                                            placeholder="ghi chú"
                                        />
                                    </Modal>
                                </div>
                            </td>);
                }else if(arr[i-1] == null){
                    arr.push(<td> </td>);
                }
            });
            
        }
        return arr;
    }
    // console.log(row);
  return (
    <tr>
        {check(row)}
    </tr>
  )
}
