import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Button, Form, Input, message, Modal, Select, Space, Table, Tag } from 'antd';
import { createDocument, deleteDocument, getDocument } from '../../api/Document';
import {
  EditOutlined,DeleteOutlined,PlusOutlined,ExclamationCircleOutlined
} from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { createCategory, getCategory } from '../../api/Category';
import { Option } from 'antd/lib/mentions';



const userid = localStorage.getItem('userid');
const { confirm } = Modal;
export default function Document() {
  const [data,setData] = useState([]);
  const [table,setTable] = useState(<></>);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [category,setCategory] = useState(<></>);
  const [newCate,setNewCate] = useState();
  const [create,setCreate] = useState(false);
  const [isloading,setIsloading] = useState(false);
  
  const [form] = Form.useForm();
  const columns = [
    {
      title: 'Tên tài liệu',
      dataIndex: 'name',
      key: 'name',
      width: "20%"
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: "30%"
    },
    {
      title: 'Đường dẫn',
      dataIndex: 'link',
      key: 'link',
      width: "25%",
      render: text => <a href={text} target='_blank' rel='noreferrer'>{text}</a>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: "15%"
    },
    {
      title: '',
      width: "5%",
      render: (_, record) => (
        <Space size="middle">
          <DeleteOutlined onClick={() => showConfirm(record.id)} />
          {/* <a>{record.id}</a> */}
        </Space>
      ),
    },
  ];
  useEffect(()=>{
    async function getData(){
      const result = await getDocument(userid);
      if(result != 404){
        setData(result.content);
        console.log(result);
      }
    }
    getData();
    async function getCate(){
      const rs = await getCategory(userid);
      if(rs != 404){
        // setCategory(rs);
          let arr = [];
          rs.forEach(element => {
            arr.push(<Option value={element.id}>{element.name}</Option>)
          });
          setCategory(arr);
        console.log(rs);
      }
    }
    getCate();
  },[isloading])
  useEffect(()=>{
    if(data.length != 0){
      setTable(<Table columns={columns} dataSource={data} style={{width: "76vw"}} />);
    }
  },[data])
  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }
  const handleAddCate = () => {
    setCreate(true);
  }
  const handleSelectCate = () => {
    setCreate(false);
  }
  const onFinish = async (values) => {
    const data = {
      name: values.name,
      description: values.description,
      link: values.link,
      id_category: (newCate != undefined && values.category == newCate.name) ? newCate.id : values.category
    }
    const rs = await createDocument(data);
    console.log(data);
    if(rs != 404){
      setIsloading(!isloading);
      setIsModalOpen(false);
      message.success("Thêm tài liệu thành công");
    }else{
      message.error("Thêm tài liệu thất bại");
    }
    
  }
  const createCate = async () => {
    const rs = await createCategory(userid,newCate);
    if(rs != 404){
      const element = <Option selected value={rs.id}>{rs.name}</Option>;
      setCategory([...category,element]);
      setNewCate(rs);
      setCreate(false);
      message.success("Tạo danh mục thành công");
    }
  }
  const suffixAfter = (
    <div style={{display: "flex"}}>
      <button className='cate-btn' onClick={createCate} type='button'>+</button>
      <button className='cate-btn' onClick={handleSelectCate}>x</button>
    </div>
  );
  
  const handleChange = (value) => {
    setNewCate(value);
    console.log(value);
  }
  const showConfirm = (id) => {
    confirm({
      title: 'Bạn có muốn xóa tài liệu này?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        
        async function deleteDocumentById(noteid){
            const result = await deleteDocument(noteid);
            if(result != 404){
              setIsloading(!isloading);
                message.success("Xóa tài liệu thành công");
            }else{
              message.error('Xóa tài liệu thất bại');
            }
        }
        deleteDocumentById(id);
      },
      onCancel() {
      },
    });
  };
  return (
    <>
    <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{float: "right", margin: "0 4vw 20px 0"}}>
            Thêm
            </Button>
      {table }

      <Modal title="Thêm tài liệu" open={isModalOpen} onCancel={handleCancel} footer={false}>

    <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        name="normal_login"
        className="login-ttdt-form"
        onFinish={onFinish}
    >
        <Form.Item label="Tài liệu"
        name="name"
        rules={[{ required: true, message: 'Tên tài liệu không được để trống' }]}
        >
        <Input placeholder="Tên tài liệu" />
        </Form.Item>
        <Form.Item label="Danh mục" name="category">
          {create ? <Input addonAfter={suffixAfter} onChange={e => handleChange(e.target.value)}/> : <Select name="cate">
              {category}
              <Option ><button onClick={handleAddCate} style={{border: 'none', textDecoration: "underline", width: "100%",cursor: "pointer"}}>
                Thêm danh mục</button></Option>
            </Select>}
            {/* {create ? <><button type='button' onClick={handleSelectCate}>v</button><button type='button' onClick={handleSelectCate}>X</button></> : 
            <button type='button' onClick={handleAddCate}>+</button>} */}
        </Form.Item>
        
        <Form.Item label="Đường dẫn"
        name="link"
        rules={[{ required: true, message: 'Tên tài liệu không được để trống' }]}
        >
        <Input placeholder="Đường dẫn tài liệu" />
        </Form.Item>
        <Form.Item label="Chi tiết"
        name="description"
        >
        <TextArea  placeholder="Mô tả công việc"/>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft: "10vw"}} disabled={create}>
            Thêm tài liệu
        </Button>
        </Form.Item>
    </Form>
</Modal>
    </>
  )
}
