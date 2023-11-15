import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './Index.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, App, Form, Input, Checkbox, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'

function Register({ setState, setLoading }) {
  const navigate = useNavigate()

  const [form] = Form.useForm()

  const { message, modal, notification } = App.useApp()

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    setLoading(true)
    await axios.post('http://localhost:8080/api/user/register', values, {
      withCredentials: true
    })
      .then(response => {
        if (response.data === 'success') {
          message.success('Register successfully!');
          navigate('/');
        } else {
          message.error('Register failed!');
        }
      })
      .catch(error => {
        console.error('Request Fail:', error);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const validateEmail = async (value) => {
    const emailPattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!emailPattern.test(value)) {
      if (value.length !== 0) {
        throw new Error('The input is not valid E-mail!');
      }
    } else {
      await axios.get('http://localhost:8080/api/user/validateEmail?email=' + value, {
        withCredentials: true
      })
        .then(response => {
          if (response.data === 'success') {
            throw new Error('This email is already registered!');
          }
        })
    }
  }

  const validateUsername = async (value) => {
    const usernamePattern = /^[a-zA-Z0-9_-]{4,16}$/;
    if (!usernamePattern.test(value)) {
      if (value.length !== 0) {
        throw new Error('Username must be 4-16 characters long!');
      }
    } else {
      await axios.get('http://localhost:8080/api/user/validateUsername?username=' + value, {
        withCredentials: true
      })
        .then(response => {
          if (response.data === 'success') {
            throw new Error('This username is already registered!');
          }
        })
    }
  }

  return (
    <Form
      name="normal_register"
      className="register-form"
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="email"
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
        <Input
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="username"
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
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please input your Password!' },
          { min: 6, message: 'Password must be at least 6 characters!' },
        ]}
        hasFeedback
      >
        <Input.Password
          type="password"
          placeholder="Password"
          minLength={6}
        />
      </Form.Item>
      <Form.Item
        name="password2"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please input your Password again!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Passwords do not match!'))
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password
          type="password"
          placeholder="Password again"
          minLength={6}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="register-form-button">
          Register
        </Button>
        Or <Link onClick={() => setState(false)}>login now!</Link>
      </Form.Item>
    </Form>
  )

}

function Login({ setState, setLoading }) {
  const navigate = useNavigate()

  const [form] = Form.useForm()
  const { message, modal, notification } = App.useApp()

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    setLoading(true);
    await axios.post('http://localhost:8080/api/user/login', values, {
      withCredentials: true
    })
      .then(response => {
        if (response.data === 'success') {
          message.success('Login successfully!');
          navigate('/dashboard');
        } else {
          message.error('Login failed!');
        }
      })
      .catch(error => {
        console.error('Request Fail:', error);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" onClick={() => {
          modal.info({
            title: 'Forgot password',
            content: (
              <div>
                <p>Please contact the administrator to reset your password.</p>
                <p>
                  <a href="mailto:" target="_blank">
                    Email
                  </a>
                </p>
              </div>
            ),
            onOk() { },
          })
        }}>
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link onClick={() => setState(true)}>register now!</Link>
      </Form.Item>
    </Form>
  )
}

function Home() {

  const navigate = useNavigate()
  const [state, setState] = useState(false)
  const [loading, setLoading] = useState(false)

  function LRCard({ state, setLoading }) {
    if (state) {
      return (
        <div className="card">
          <Register setState={setState} setLoading={setLoading} />
        </div>
      )
    } else {
      return (
        <div className="card">
          <Login setState={setState} setLoading={setLoading} />
        </div>
      )
    }
  }

  const validateUser = async () => {
    await axios.get('http://localhost:8080/api/user/info', {
      withCredentials: true
    })
      .then(response => {
        if (response.status === 200) {
          return navigate('/dashboard');
        }
      })
      .catch(error => {
        throw error;
      })
  }

  useEffect(() => {
    validateUser().catch((error) => {
      console.log(error);
    })
  })

  return (
    <App className='login-register'>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>IoT Platform</h1>
      <Spin spinning={loading}>
        <Card
          hoverable
          className='login-card'
        >
          <LRCard state={state} setLoading={setLoading} />
        </Card>
      </Spin>
      <p className="index-footer">
        PeiPei, Zhejiang University
      </p>
    </App>
  )
}

export default Home
