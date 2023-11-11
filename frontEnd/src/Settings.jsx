import { useState } from 'react';
import { Menu, Form, Button, Input, Row, Col, App, Typography, Modal, Alert, Avatar } from 'antd';
import { SettingOutlined, LockOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'

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
    setTimeout(() => {
      emailForm.resetFields()
      message.success('Change email successfully!')
    }, 2000)
  }

  const onUsernameFinish = (values) => {
    console.log('Received values of form: ', values);
    setTimeout(() => {
      usernameForm.resetFields()
      message.success('Change username successfully!')
    }, 2000)
  }

  const onDeleteAccountFinish = (values) => {
    console.log('Received values of form: ', values);
    setTimeout(() => {
      if (values.password === '123456') {
        deleteAccountForm.resetFields()
        setDeleteAccountModal(false)
        message.success('Delete account successfully!')
        navigate('/')
      } else {
        message.error('Wrong password!')
      }
    }, 2000)
  }

  const deleteAccount = () => {
    setDeleteAccountModal(true)
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
          validateStatus={emailState}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                return new Promise((resolve, reject) => {
                  const emailPattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                  if (!emailPattern.test(value)) {
                    setEmailState('error');
                    reject(new Error('The input is not valid E-mail!'));
                  } else {
                    setEmailState('validating');
                    setTimeout(() => {
                      if (value === 'admin@admin.com') {
                        setEmailState('error');
                        reject(new Error('This email is already registered!'));
                      } else {
                        setEmailState('success');
                        resolve();
                      }
                    }, 1000);
                  }
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
          validateStatus={usernameState}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                return new Promise((resolve, reject) => {
                  const usernamePattern = /^[a-zA-Z0-9_-]{4,16}$/;
                  if (!usernamePattern.test(value)) {
                    setUsernameState('error');
                    reject(new Error('Username must be 4-16 characters long!'));
                  } else {
                    setUsernameState('validating');
                    setTimeout(() => {
                      if (value === 'admin') {
                        setUsernameState('error');
                        reject(new Error('This username is already registered!'));
                      } else {
                        setUsernameState('success');
                        resolve();
                      }
                    }, 1000);
                  }
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
    setTimeout(() => {
      message.success('Change password successfully!')
      form.resetFields()
      setLoadingChange(false)
    }, 2000)
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
  const [username, setUsername] = useState('admin');
  const [email, setEmail] = useState('admin@admin.com');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', height: 50, margin: '30px 0' }}>
        <Avatar size={50} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <div style={{ marginLeft: 10 }}>
          <Text strong style={{fontSize: 20}}>{username}</Text><Text strong type="secondary" style={{fontSize: 20}}> ({email})</Text>
          <br />
          <Text type="secondary">Your personal account</Text>
        </div>
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