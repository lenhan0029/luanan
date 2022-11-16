import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Button, Card, Timeline } from 'antd';
import { DatePicker, Popover } from 'antd';
import {
    PlusOutlined,DeleteOutlined,EditOutlined
  } from '@ant-design/icons';

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
export default function NoteDay() {
    const [mode, setMode] = useState('left');

    const showModal = () => {

    }
    return (
      <>
        <div style={{marginBottom: 50,display: "flex",justifyContent: "right"}}>
            
            <div>
                <Button style={{marginRight: "10px"}}>Today</Button>
                <DatePicker />
            </div>
            <div style={{marginLeft: "50px"}}>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Add
            </Button>
            </div>
        </div>
        <div>
            <Timeline mode={mode} style={{float: "left",width: "40%"}}>
            <Timeline.Item label="7:00" style={{marginBottom: 10}}>
                <Card title="Khóa luận tốt nghiệp" extra={<DeleteOutlined />}
                bordered={true} style={{ width: "30vw",height: "8vw", marginBottom: 10 }}>
                    <div style={{display: "flex"}} className="note-content">
                        <p>Card content</p>
                        <EditOutlined className='edit-icon'/>
                    </div>
                </Card>
                <Card title="Nghiên cứu khoa học" extra={<DeleteOutlined />}
                bordered={true} style={{ width: "30vw",height: "8vw", marginBottom: 10 }}>
                    <div style={{display: "flex"}} className="note-content">
                        <p>Card content</p>
                        <EditOutlined className='edit-icon'/>
                    </div>
                </Card>
            </Timeline.Item>
            <Timeline.Item label="8:00">
                
            </Timeline.Item>
            <Timeline.Item label="9:00">
                <Card title="Nghiên cứu khoa học" extra={<DeleteOutlined />}
                bordered={true} style={{ width: "30vw",height: "8vw", marginBottom: 10 }}>
                    <div style={{display: "flex"}} className="note-content">
                        <p>Card content</p>
                        <EditOutlined className='edit-icon'/>
                    </div>
                </Card>
            </Timeline.Item>
            <Timeline.Item label="10:00">
                <Card title="Nghiên cứu khoa học" extra={<DeleteOutlined />}
                bordered={true} style={{ width: "30vw",height: "8vw", marginBottom: 10 }}>
                    <div style={{display: "flex"}} className="note-content">
                        <p>Card content</p>
                        <EditOutlined className='edit-icon'/>
                    </div>
                </Card>
                <Card title="Khóa luận tốt nghiệp" extra={<DeleteOutlined />}
                bordered={true} style={{ width: "30vw",height: "8vw", marginBottom: 10 }}>
                    <div style={{display: "flex"}} className="note-content">
                        <p>Card content</p>
                        <EditOutlined className='edit-icon'/>
                    </div>
                </Card>
            </Timeline.Item>
            <Timeline.Item label="11:00">

            </Timeline.Item>
            <Timeline.Item label="12:00">

            </Timeline.Item>
            <Timeline.Item label="13:00">

            </Timeline.Item>
            <Timeline.Item label="14:00">
                <Card title="Khóa luận tốt nghiệp" extra={<DeleteOutlined />}
                bordered={true} style={{ width: "30vw",height: "8vw", marginBottom: 10 }}>
                    <div style={{display: "flex"}} className="note-content">
                        <p>Card content</p>
                        <EditOutlined className='edit-icon'/>
                    </div>
                </Card>
                <Card title="Nghiên cứu khoa học" extra={<DeleteOutlined />}
                bordered={true} style={{ width: "30vw",height: "8vw", marginBottom: 10 }}>
                    <div style={{display: "flex"}} className="note-content">
                        <p>Card content</p>
                        <EditOutlined className='edit-icon'/>
                    </div>
                </Card>
            </Timeline.Item>
            <Timeline.Item label="15:00">Create a services</Timeline.Item>
            <Timeline.Item label="16:00">Solve initial network problems</Timeline.Item>
            <Timeline.Item label="17:00">Technical testing</Timeline.Item>
            <Timeline.Item label="18:00">Network problems being solved</Timeline.Item>
            </Timeline>
        </div>
      </>
    );
  };