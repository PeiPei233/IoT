import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, SettingOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import reactLogo from './assets/react.svg'
import { App, Menu, Layout, Avatar, Modal, Typography } from 'antd';
import { useNavigate } from 'react-router-dom'
import './dashboard.css';
import Home from './Home.jsx';
import Devices from './Devices.jsx';
import Searching from './Search';
import Settings from './Settings';
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
  const [showDocModal, setShowDocModal] = useState(false);
  const { message, modal, notification } = App.useApp();

  function DashContent({ current }) {
    if (current === 'home') {
      return (
        <div className="card">
          <Home setCurrent={setCurrent} setShowDocModal={setShowDocModal} />
        </div>
      )
    } else if (current === 'devices') {
      return (
        <div className="card">
          <Devices setShowDocModal={setShowDocModal} />
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
            <DashContent current={current} />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}>
          IoT Platform ©2023 Created by PeiPei</Footer>
      </Layout>
      <Modal
        open={showDocModal}
        onOk={() => setShowDocModal(false)}
        onCancel={() => setShowDocModal(false)}
        width={800}
        footer={null}
      >
        <div style={{
          margin: '0 20px 20px 24px',
        }}>
          <Title level={2}
            style={{
              marginTop: '1rem',
            }}
          >IoT Platform Document</Title>
          <Title level={3}
            style={{
              borderBottom: '1px solid #e8e8e8',
              paddingBottom: '0.5rem',
              marginTop: '1rem',
            }}
          >Introduction</Title>
          <Text>
            This is a platform for IoT devices. It provides a way to manage your devices and data.
          </Text>
          <Title level={3}
            style={{
              borderBottom: '1px solid #e8e8e8',
              paddingBottom: '0.5rem',
              marginTop: '1rem',
            }}
          >How to send message</Title>
          <Text>
            Your device can send message to the platform by MQTT protocol. The url is <Text code>tcp://localhost:1883</Text>. The topic is <Text code>testapp</Text>. The message should be a JSON object. The format is as follows:
          </Text>
          <div style={{
            color: '#3b3b3b',
            backgroundColor: '#f5f5f5',
            fontFamily: 'Consolas, Courier New, monospace',
            fontWeight: 'normal',
            fontSize: '14px',
            lineHeight: '19px',
            whiteSpace: 'pre-wrap',
            borderRadius: '3px',
            padding: '.8em',
            marginTop: '16px',
            marginBottom: '16px'
          }}>
            <div>{'{'}</div>
            <div>    <span style={{ color: '#008000' }}>// Device ID when adding a device</span></div>
            <div>    <span style={{ color: '#0451a5' }}>"clientId"</span><span>: </span><span style={{ color: '#a31515' }}>"00001"</span>,</div>
            <div>    <span style={{ color: '#008000' }}>// Device info/message</span></div>
            <div>    <span style={{ color: '#0451a5' }}>"info"</span><span>: </span><span style={{ color: '#a31515' }}>"This is a message"</span>,</div>
            <div>    <span style={{ color: '#008000' }}>// {'>'}=0: message value with device status normal</span></div>
            <div>    <span style={{ color: '#008000' }}>// -1: device status warning, -2: device status error</span></div>
            <div>    <span style={{ color: '#0451a5' }}>"value"</span><span>: </span><span style={{ color: '#098658' }}>4</span>,</div>
            <div>    <span style={{ color: '#008000' }}>// Message type: 0: normal, 1: warning, 2: error</span></div>
            <div>    <span style={{ color: '#0451a5' }}>"alert"</span><span>: </span><span style={{ color: '#098658' }}>0</span>,</div>
            <div>    <span style={{ color: '#008000' }}>// longitude</span></div>
            <div>    <span style={{ color: '#0451a5' }}>"lng"</span><span>: </span><span style={{ color: '#098658' }}>116.397428</span>,</div>
            <div>    <span style={{ color: '#008000' }}>// latitude</span></div>
            <div>    <span style={{ color: '#0451a5' }}>"lat"</span><span>: </span><span style={{ color: '#098658' }}>39.90923</span>,</div>
            <div>    <span style={{ color: '#008000' }}>// timestamp in milliseconds</span></div>
            <div>    <span style={{ color: '#0451a5' }}>"timestamp"</span><span>: </span><span style={{ color: '#098658' }}>16276164700000</span></div>
            <div>{'}'}</div>
          </div>
        </div>
          
      </Modal>
    </>
  )
};
export default Dashboard;