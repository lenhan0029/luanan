import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, message } from 'antd';
import { login } from '../../api/AuthAPI';
import axiosClient from '../../api/axiosClient';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {

  const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        const result = await login(values);
        // console.log(result.token);
        if(result.token != null){
          localStorage.setItem('token',result.token);
          navigate('/home/thoikhoabieu');
        }else{
          message.error('Thông tin đăng nhập không chính xác');
        }
        
      };
      // useEffect(() => {
      //   const rs = () => {
      //     axios.get('http://cosmetics-shop.azurewebsites.net/brand');
      //   }
      //   console.log(rs());
      // })
      
      return (
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <h1>Đăng nhập</h1>
          <Form.Item
            name="userName"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
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
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
    
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}
    
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Đăng nhập
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      );
    };
