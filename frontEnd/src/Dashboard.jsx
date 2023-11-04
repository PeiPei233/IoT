import React, { useState } from 'react';
import { AppstoreOutlined, SettingOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import reactLogo from './assets/react.svg'
import { App, Menu, Layout, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom'
import './dashboard.css';
import Home from './Home.jsx';
import Devices from './Devices.jsx';
import Searching from './Search';
import Settings from './Settings';

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
      navigate('/')
    }
  }

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <App className='dashboard'>
      <Layout style={{ minHeight: '100vh' }}>
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
    </App>
  )
};
export default Dashboard;