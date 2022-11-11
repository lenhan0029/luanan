import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProjectOutlined,
  UserOutlined,
  CalendarOutlined,
  FormOutlined,
  CopyOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Alert, Button, Layout, Menu } from 'antd';
import TimeTable from '../components/timetable/view/TimeTable';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import Project from '../components/project/Project';
import Note from '../components/notes/Note';
import Document from '../components/document/Document';
import Task from '../components/project/Task';

const { Header, Sider, Content } = Layout;

export default function Navbar() {
  let navigate = useNavigate();
  const url = useParams();
  let location = useLocation();
  let word = JSON.stringify(url).split('"')[3];
  const [collapsed, setCollapsed] = useState(false);
  const title = () => {
    var title = [];
              switch (word) {
                case "thoikhoabieu":
                  title.push(<h2>Thời Khóa biểu</h2>);
                  break;
                case "duan":
                  title.push(<h2>Dự án</h2>);
                  break;
                case "ghichu":
                  title.push(<h2>Ghi chú</h2>);
                  break;
                case "tailieu":
                  title.push(<h2>Tài liệu</h2>);
                  break;
                default:
                  break;
              }
              return title;
  }
  const navItem = () =>{
    let item = location.pathname.split('/')[2];
    switch (item) {
      case "thoikhoabieu":
        return ['1'];
      case "duan":
        return ['2'];
      case "ghichu":
        return ['3'];
      case "tailieu":
        return ['4'];
      default:
        break;
    }
  }
  const nowItem = navItem();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" /> 
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={nowItem}
          items={[
            {
              key: '1',
              icon: <CalendarOutlined />,
              label: 'Thời Khóa biểu',
              onClick: () => { navigate('/home/thoikhoabieu')}

            },
            {
              key: '2',
              icon: <ProjectOutlined />,
              label: 'Dự án',
              onClick: () => { navigate('/home/duan')}
            },
            {
              key: '3',
              icon: <FormOutlined />,
              label: 'Ghi chú',
              onClick: () => { navigate('/home/ghichu')}
            },
            {
              key: '4',
              icon: <CopyOutlined />,
              label: 'Tài liệu',
              onClick: () => { navigate('/home/tailieu')}
            },
            {
              key: '5',
              icon: <LogoutOutlined />,
              label: 'Đăng xuất',
              onClick: () => {alert("đăng xuất")}
            },
          ]}
         />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div style={{display: "flex"}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            {title()}
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 648,
          }}
        >
          <Routes>
            <Route path='/thoikhoabieu' element={<TimeTable />}></Route>
            <Route path='/duan' element={<Project />}></Route>
            <Route path='/ghichu' element={<Note />}></Route>
            <Route path='/tailieu' element={<Document />}></Route>
            <Route path='/duan/:id' element={<Task />}></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
