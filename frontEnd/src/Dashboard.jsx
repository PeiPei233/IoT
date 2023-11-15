import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, SettingOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import reactLogo from './assets/react.svg'
import { App, Menu, Layout, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom'
import './dashboard.css';
import Home from './Home.jsx';
import Devices from './Devices.jsx';
import Searching from './Search';
import Settings from './Settings';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    label: (
      <div className="logo-demo" >
        <a>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    ),
    key: 'home'
  },
  {
    label: 'Devices',
    key: 'devices',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Searching',
    key: 'search',
    icon: <SearchOutlined />,
  },
];

const avatarItems = [{
  label: (
    <div className="logo-demo" >
      <a>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </a>
    </div>
  ),
  key: 'user',
  children: [
    {
      label: 'Settings',
      key: 'settings',
      icon: <SettingOutlined />,
    },
    {
      label: 'Log out',
      key: 'logout',
      icon: <LogoutOutlined />,
    },
  ]
}];

const Dashboard = () => {

  const navigate = useNavigate()
  const [current, setCurrent] = useState('home');
  const { message, modal, notification } = App.useApp();

  function DashContent({ current }) {
    if (current === 'home') {
      return (
        <div className="card">
          <Home />
        </div>
      )
    } else if (current === 'devices') {
      return (
        <div className="card">
          <Devices />
        </div>
      )
    } else if (current === 'search') {
      return (
        <div className="card">
          <Searching />
        </div>
      )
    } else if (current === 'settings') {
      return (
        <div className="card">
          <Settings />
        </div>
      )
    } else if (current === 'logout') {
      axios.get(`${import.meta.env.VITE_API_URL}/api/user/logout`, {
        withCredentials: true
      })
        .then(response => {
          if (response.data === 'success') {
            message.success('Logout successfully!');
            setTimeout(() => {
              navigate('/');
            }, 1000);
          } else {
            notification.error({
              message: 'Logout failed!',
              description: 'Please try again later!',
            });
          }
        })
        .catch(error => {
          console.error('Request Fail:', error);
          if (error.response.status === 400) {
            notification.error({
              message: 'Please login first!',
              description: 'You have not logged in yet, please log in first!',
            });
            navigate('/');
          } else {
            notification.error({
              message: 'Logout failed!',
              description: error.message,
            });
          }
        })
    }
  }

  const validateUser = async () => {
    await axios.get(`${import.meta.env.VITE_API_URL}/api/user/info`, {
      withCredentials: true
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Request Fail');
        }
      })
      .catch(error => {
        throw error;
      })
  }

  useEffect(() => {
    validateUser().catch((error) => {
      console.error(error);
      notification.error({
        message: 'Please login first!',
        description: 'You have not logged in yet, please log in first!',
      });
      navigate('/');
    })
  }, []);

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
      <Layout style={{ minHeight: '100vh' }} className='dashboard'>
        <Header style={
          {
            background: (246, 248, 250),
            borderBottom: '1px solid #eee',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
          }
        }>
          <Menu
            style={
              {
                background: (246, 248, 250),
                borderBottom: '1px solid #eee',
                width: '100%'
              }
            }
            onClick={onClick}
            selectedKeys={[current]} mode="horizontal" items={items} />
          <Menu
            style={
              {
                background: (246, 248, 250),
                borderBottom: '1px solid #eee',
              }
            }
            mode='horizontal'
            items={avatarItems}
            onClick={onClick}
          />
        </Header>
        <Content style={{ padding: '0 40px 2em', background: '#fff' }}>
          <div className="site-layout-content">
            <DashContent current={current} />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}>
          IoT Platform ©2023 Created by PeiPei</Footer>
      </Layout>
  )
};
export default Dashboard;