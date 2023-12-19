import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, SettingOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import reactLogo from './assets/react.svg'
import { App, Menu, Layout, Avatar, Modal, Typography } from 'antd';
import { useNavigate } from 'react-router-dom'
import './Home.css';
import Dashboard from './Dashboard.jsx';
import Devices from './Devices.jsx';
import Searching from './Search';
import Settings from './Settings';
import NotFound from './NotFound.jsx';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;
const { Text, Title } = Typography;

const items = [
  {
    label: (
      <div className="logo-demo" >
        <a>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    ),
    key: 'dashboard'
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

const Home = ({ current }) => {

  const navigate = useNavigate()
  const { message, modal, notification } = App.useApp();

  function HomeContent({ current }) {
    if (current === 'dashboard') {
      return (
        <div className="card">
          <Dashboard />
        </div>
      )
    } else if (current === 'devices') {
      return (
        <div className="card">
          <Devices/>
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
    } else {
      return (
        <NotFound />
      )
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
    if (e.key === current) {
      return;
    } else if (e.key === 'dashboard') {
      navigate('/dashboard');
    } else if (e.key === 'devices') {
      navigate('/devices');
    } else if (e.key === 'search') {
      navigate('/search');
    } else if (e.key === 'settings') {
      navigate('/settings');
    } else if (e.key === 'logout') {
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
  };

  return (
    <>
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
            <HomeContent current={current} />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}>
          IoT Platform ©2023 Created by PeiPei</Footer>
      </Layout>
    </>
  )
};
export default Home;