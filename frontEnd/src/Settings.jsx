import { useState, useEffect } from 'react';
import { Menu, Form, Button, Input, Row, Col, App, Typography, Modal, Alert, Avatar, Skeleton } from 'antd';
import { SettingOutlined, LockOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const { Title, Text } = Typography;

const items = [
  {
    label: 'Account',
    key: 'account',
    icon: <SettingOutlined />,
  },
  {
    label: 'Password',
    key: 'password',
    icon: <LockOutlined />,
  }
];

function Account() {
  const navigate = useNavigate()

  const [emailForm] = Form.useForm()
  const [usernameForm] = Form.useForm()
  const [deleteAccountForm] = Form.useForm()
  const [emailState, setEmailState] = useState('none')
  const [usernameState, setUsernameState] = useState('none')
  const [deleteAccountModal, setDeleteAccountModal] = useState(false)

  const { message, modal, notification } = App.useApp()

  const onEmailFinish = (values) => {
    console.log('Received values of form: ', values);
    axios.post(`${import.meta.env.VITE_API_URL}/api/user/changeEmail`, values, {
      withCredentials: true
    })
      .then(response => {
        if (response.data === 'success') {
          message.success('Change email successfully!');
          emailForm.resetFields()
        } else {
          notification.error({
            message: 'Change email failed!',
            description: response.data
          })
        }
      })
      .catch(error => {
        console.error('Request Fail:', error);
        notification.error({
          message: 'Change email failed!',
          description: error.message
        })
      })
  }

  const onUsernameFinish = (values) => {
    console.log('Received values of form: ', values);
    axios.post(`${import.meta.env.VITE_API_URL}/api/user/changeUsername`, values, {
      withCredentials: true
    })
      .then(response => {
        if (response.data === 'success') {
          message.success('Change username successfully!');
          usernameForm.resetFields()
        } else {
          notification.error({
            message: 'Change username failed!',
            description: response.data
          })
        }
      })
      .catch(error => {
        console.error('Request Fail:', error);
        notification.error({
          message: 'Change username failed!',
          description: error.message
        })
      })
  }

  const onDeleteAccountFinish = (values) => {
    console.log('Received values of form: ', values);
    // setTimeout(() => {
    //   if (values.password === '123456') {
    //     deleteAccountForm.resetFields()
    //     setDeleteAccountModal(false)
    //     message.success('Delete account successfully!')
    //     navigate('/')
    //   } else {
    //     message.error('Wrong password!')
    //   }
    // }, 2000)
    axios.post(`${import.meta.env.VITE_API_URL}/api/user/delete`, values, {
      withCredentials: true
    })
      .then(response => {
        if (response.data === 'success') {
          deleteAccountForm.resetFields()
          setDeleteAccountModal(false)
          message.success('Delete account successfully!')
          navigate('/')
        } else {
          notification.error({
            message: 'Delete account failed!',
            description: response.data
          })
        }
      })
      .catch(error => {
        console.error('Request Fail:', error);
        notification.error({
          message: 'Delete account failed!',
          description: error.message
        })
      })
  }

  const deleteAccount = () => {
    setDeleteAccountModal(true)
  }

  const validateEmail = async (value) => {
    const emailPattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!emailPattern.test(value)) {
      if (value.length !== 0) {
        throw new Error('The input is not valid E-mail!');
      }
    } else {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/validateEmail?email=` + value);
        const data = await response.text();
        if (data === 'success') {
          throw new Error('This email is already registered!');
        }
      } catch (error) {
        throw error;
      }
    }
  }

  const validateUsername = async (value) => {
    const usernamePattern = /^[a-zA-Z0-9_-]{4,16}$/;
    if (!usernamePattern.test(value)) {
      if (value.length !== 0) {
        throw new Error('Username must be 4-16 characters long!');
      }
    } else {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/validateUsername?username=` + value);
        const data = await response.text();
        if (data === 'success') {
          throw new Error('This username is already registered!');
        }
      } catch (error) {
        throw error;
      }
    }
  }

  return (
    <>
      <Title level={3}
        style={{
          borderBottom: '1px solid #e8e8e8',
          paddingBottom: '0.5rem',
          marginTop: '1rem',
        }}
      >
        Change Email
      </Title>
      <Form
        form={emailForm}
        initialValues={{ remember: true }}
        onFinish={onEmailFinish}
        scrollToFirstError
        layout='inline'
        style={{
          marginBottom: '3rem',
        }}
      >
        <Form.Item
          name="email"
          label="New E-mail"
          validateDebounce={1000}
          rules={[
            { required: true, message: 'Please input your E-mail!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                return new Promise((resolve, reject) => {
                  validateEmail(value).then(resolve).catch(reject);
                });
              },
            }),
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Change
          </Button>
        </Form.Item>
      </Form>
      <Title level={3}
        style={{
          borderBottom: '1px solid #e8e8e8',
          paddingBottom: '0.5rem',
        }}
      >
        Change Username
      </Title>
      <Form
        form={usernameForm}
        initialValues={{ remember: true }}
        onFinish={onUsernameFinish}
        scrollToFirstError
        layout='inline'
        style={{
          marginBottom: '3rem',
        }}
      >
        <Form.Item
          name="username"
          label="New Username"
          hasFeedback
          validateDebounce={1000}
          rules={[
            { required: true, message: 'Please input your Username!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                return new Promise((resolve, reject) => {
                  validateUsername(value).then(resolve).catch(reject);
                });
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Change
          </Button>
        </Form.Item>
      </Form>
      <Title level={3}
        style={{
          borderBottom: '1px solid #e8e8e8',
          paddingBottom: '0.5rem',
        }}
      >
        Delete Account
      </Title>
      <Alert
        message="Once you delete your account, there is no going back. Please be certain."
        type="warning"
        showIcon
        style={{
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      />
      <Button type="primary" danger icon={<DeleteOutlined />} onClick={deleteAccount}>
        Delete Account
      </Button>

      <Modal title="Delete Account"
        open={deleteAccountModal}
        footer={null}
        onCancel={() => setDeleteAccountModal(false)}
      >
        <Text type="strong">Are you sure you want to delete your account?</Text>
        <Alert
          message="This action cannot be undone!"
          type="warning"
          description="All your data and associated devices will be deleted permanently!"
          showIcon
          style={{
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        />
        <Text style={{
          fontWeight: 'bold',
        }}>Please enter your password to confirm:</Text>
        <Form
          form={deleteAccountForm}
          initialValues={{ remember: true }}
          onFinish={onDeleteAccountFinish}
          scrollToFirstError
          layout='vertical'
          style={{
            marginTop: '1rem',
          }}
        >
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your Password!' },
            ]}
            hasFeedback
          >
            <Input.Password
              type="password"
              minLength={6}
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" danger style={{
              width: '100%',
            }}>
              <b>I'm sure, delete my account!</b>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )

}

function Password() {

  const [form] = Form.useForm()

  const { message, modal, notification } = App.useApp()

  const [loadingChange, setLoadingChange] = useState(false)

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    setLoadingChange(true)
    axios.post(`${import.meta.env.VITE_API_URL}/api/user/changePassword`, values, {
      withCredentials: true
    })
      .then(response => {
        if (response.data === 'success') {
          message.success('Change password successfully!');
          form.resetFields()
        } else {
          notification.error({
            message: 'Change password failed!',
            description: response.data
          })
        }
      })
      .catch(error => {
        console.error('Request Fail:', error);
        notification.error({
          message: 'Change password failed!',
          description: error.message
        })
      })
      .finally(() => {
        setLoadingChange(false)
      })
  }

  return (
    <>
      <Title level={3}
        style={{
          borderBottom: '1px solid #e8e8e8',
          paddingBottom: '0.5rem',
          marginTop: '1rem',
        }}
      >
        Change Password
      </Title>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        scrollToFirstError
        layout='horizontal'
        style={{
          maxWidth: '400px',
        }}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
        <Form.Item
          name="oldPassword"
          label="Old Password"
          rules={[
            { required: true, message: 'Please input your old password!' },
          ]}
          hasFeedback
        >
          <Input.Password
            type="password"
            minLength={6}
            placeholder='Old Password'
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: 'Please input your new password!' },
          ]}
          hasFeedback
        >
          <Input.Password
            type="password"
            minLength={6}
            placeholder='New Password'
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            type="password"
            minLength={6}
            placeholder='Confirm Password'
          />
        </Form.Item>
        <Form.Item style={{
          textAlign: 'center'
        }}>
          <Button type="primary" htmlType="submit" loading={loadingChange}>
            Change
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default function Settings() {

  const [current, setCurrent] = useState('account');
  const [username, setUsername] = useState('unknown');
  const [email, setEmail] = useState('unknown@unkown.com');
  const [loadingInfo, setLoadingInfo] = useState(false)

  useEffect(() => {
    setLoadingInfo(true)
    axios.get(`${import.meta.env.VITE_API_URL}/api/user/info`, {
      withCredentials: true
    })
      .then(response => {
        setUsername(response.data.username)
        setEmail(response.data.email)
      })
      .catch(error => {
        console.error('Request Fail:', error);
      })
      .finally(() => {
        setLoadingInfo(false)
      })
  }, [])

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', height: 50, margin: '30px 0' }}>
        {!loadingInfo && <>
          <Avatar size={50} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <div style={{ marginLeft: 10 }}>
            <Text strong style={{ fontSize: 20 }}>{username}</Text><Text strong type="secondary" style={{ fontSize: 20 }}> ({email})</Text>
            <br />
            <Text type="secondary">Your personal account</Text>
          </div>
        </>}
        {loadingInfo && <>
          <Skeleton.Avatar active size={50} />
          <div style={{ marginLeft: 10 }}>
            <Skeleton.Input style={{ width: 200 }} active size='small' />
            <br />
            <Skeleton.Input style={{ width: 200 }} active size='small' />
          </div>
        </>}
      </div>
      <Row gutter={32}>
        <Col xs={24} md={6}>
          <Menu
            defaultSelectedKeys={['account']}
            mode="inline"
            items={items}
            onClick={onClick}
          />
        </Col>
        <Col xs={24} md={18}>
          {current === 'account' ? <Account /> : <Password />}
        </Col>
      </Row>
    </div>
  )
}