import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Tabs,Button,Modal } from 'antd';
import Item from './Item';
import {
  PlusOutlined
} from '@ant-design/icons';


const data = [{id: 1, name: "quản lý ghi chú", priority: 1, status: 3},
{id: 2, name: "quản lý ghi chú 1", priority: 2, status: 1},
{id: 3, name: "quản lý ghi chú 2", priority: 3, status: 2},
{id: 4, name: "quản lý ghi chú 3", priority: 1, status: 3},
{id: 5, name: "quản lý ghi chú 4", priority: 2, status: 1},
{id: 6, name: "quản lý ghi chú 5", priority: 3, status: 2},
{id: 7, name: "quản lý ghi chú 6", priority: 1, status: 3},
{id: 8, name: "quản lý ghi chú 7", priority: 2, status: 1},
]

export default function Project() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

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
  const checknav = (data) =>{
    let title = "";
    switch (data) {
      case "1":
        title = "Đang chờ";
        break;
      case "2":
          title = "Đang thực hiện";
          break;
      case "3":
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
        <h2>Low</h2>
        <Item data={arr} priority={1}/>
      </div>
      <div  className='project-item'>
        <h2>Medium</h2>
        <Item data={arr} priority={2}/>
      </div>
      <div  className='project-item'>
        <h2>High</h2>
        <Item data={arr} priority={3}/>
      </div>
      </>
    )
  }
  const items = new Array(3).fill(null).map((_, i) => {
    var id = String(i + 1);
    return {
      label: checknav(id),
      key: id,
      children: renderStatus(id)
    };
  });
  return (
    <div className="card-container">
      <div style={{
        float: "right"
      }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add
        </Button>
      </div>
      {/* ADD modal */}
      <Modal
        title="Add"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>add</p>
      </Modal>
      <Tabs type="card" items={items} />
  </div>
  )
}
