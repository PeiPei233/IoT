import { Flex, Card, Spin, Empty, Button, FloatButton, Form, Input, Modal, App, List, Avatar, Row, Col, Typography } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { PlusOutlined, ExclamationCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'

const { confirm } = Modal
const { Search } = Input
const { Text, Title } = Typography

async function requestDevicesInfo() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/device/list`, {
      withCredentials: true
    })
    if (response.status !== 200) {
      throw new Error('Request Fail')
    }
    return response.data
  } catch (error) {
    console.error('Request Fail:', error)
    throw error
  }
}

export default function Devices() {

  const [loading, setLoading] = useState(true)
  const [devices, setDevices] = useState([])
  const [openAddModal, setOpenAddModal] = useState(false)
  const [comfirmLoading, setComfirmLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [showAddResult, setShowAddResult] = useState(false)
  const [showModifyModal, setShowModifyModal] = useState(false)
  const [modifyDevice, setModifyDevice] = useState({})
  const [result, setResult] = useState({})
  const [search, setSearch] = useState('')
  const [showDocModal, setShowDocModal] = useState(false)
  const [addForm] = Form.useForm()
  const [modifyForm] = Form.useForm()
  const { notification, message } = App.useApp()

  useEffect(() => {
    setLoading(true)
    requestDevicesInfo().then((data) => {
      setDevices(data)
    })
      .catch((error) => {
        console.error(error)
        notification.error({
          message: 'Get device list fail',
          description: error,
        })
        setDevices([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  function onSearch(value) {
    setSearch(value)
  }

  function handleOk() {
    setComfirmLoading(true)
    addForm.validateFields().then((values) => {
      console.log(values)
      axios.post(`${import.meta.env.VITE_API_URL}/api/device/add`, {
        name: values.name,
        type: values.type,
        location: values.location,
      }, {
        withCredentials: true
      }).then((response) => {
        if (response.status !== 200 || response.data === 'fail') {
          throw new Error('Request Fail')
        }
        setOpenAddModal(false)
        setShowAddResult(true)
        setResult({
          'did': response.data,
          'name': values.name,
          'type': values.type,
          'location': values.location,
          'status': values.status === 0 ? 'Normal' : values.status === 1 ? 'Warning' : 'Error'
        })
        addForm.resetFields()
      }).catch((error) => {
        console.error('Request Fail:', error)
        notification.error({
          message: 'Add device fail',
          description: 'Please check your input and try again',
        })
      })
    }).catch((info) => {
      console.log('Validate Failed:', info)
    }).finally(() => {
      setComfirmLoading(false)
    })
  }

  function handleCancel() {
    setOpenAddModal(false)
  }

  function openModal() {
    setOpenAddModal(true)
    setShowAddResult(false)
    setResult({})
    addForm.resetFields()
  }

  function handleModifyOk() {
    setComfirmLoading(true)
    modifyForm.validateFields().then((values) => {
      console.log(values)
      axios.post(`${import.meta.env.VITE_API_URL}/api/device/update`, {
        did: values.did,
        name: values.name,
        type: values.type,
        location: values.location,
      }, {
        withCredentials: true
      }).then((response) => {
        if (response.status !== 200 || response.data === 'fail') {
          throw new Error('Request Fail')
        }
        setShowModifyModal(false)
        setComfirmLoading(false)
        setLoading(true)
        requestDevicesInfo(setLoading).then((data) => {
          setDevices(data)
        })
          .catch((error) => {
            console.error(error)
            notification.error({
              message: 'Get device list fail',
              description: error,
            })
            setDevices([])
          })
          .finally(() => {
            setLoading(false)
          })
      }).catch((error) => {
        console.error('Request Fail:', error)
        setComfirmLoading(false)
        notification.error({
          message: 'Modify device fail',
          description: 'Please check your input and try again',
        })
      })
    }).catch((info) => {
      console.log('Validate Failed:', info)
    })
  }

  function handleModifyCancel() {
    setShowModifyModal(false)
  }

  return (
    <div>
      <h1>Devices</h1>
      <Spin spinning={loading}>
        {!loading && devices && devices.length > 0 &&
          <Flex wrap='wrap' gap="large">
            {devices.map((device) => (
              <Card
                key={device.did}
                style={{ width: 300, margin: '1em' }}
                hoverable
                onClick={() => {
                  setShowModifyModal(true)
                  setModifyDevice(device)
                  modifyForm.setFieldsValue({
                    did: String(device.did).padStart(8, '0'),
                    name: device.name,
                    type: device.type,
                    location: device.location,
                  })
                }}
              >
                <div style={{ position: 'absolute', top: 16, right: 16 }}>
                  <Text type="secondary">{'Device ID: ' + String(device.did).padStart(8, '0')}</Text>
                </div>
                <Avatar size={64}
                  style={{
                    backgroundColor: device.status === 0 ? '#1f883d' :
                      device.status === 1 ? '#fadb14' : '#f5222d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  icon={
                    device.status === 0 ? <CheckCircleOutlined /> :
                      device.status === 1 ? <ExclamationCircleOutlined /> : <CloseCircleOutlined />
                  } />
                <div>
                  <Title level={4} style={{ marginBottom: 0 }}>{device.name}</Title>
                  <Text>{`${device.type} - ${device.location}`}</Text>
                </div>
              </Card>
            ))}
          </Flex>}
        {!loading && devices.length === 0 && <Empty />}
      </Spin>
      <FloatButton.Group>
        <FloatButton
          icon={<PlusOutlined />}
          type='primary'
          tooltip='Add a new device'
          onClick={openModal}
        />
        <FloatButton 
          tooltip='Document'
          onClick={() => setShowDocModal(true)}
        />
        <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>
      <Modal
        title="Add a new device"
        open={openAddModal}
        onOk={handleOk}
        confirmLoading={comfirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={addForm}
          name="add-device"
        >
          <Form.Item
            name="name"
            label="Device Name"
            rules={[{ required: true, message: 'Please input device name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Device Type"
            rules={[{ required: true, message: 'Please input device type!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Device Location"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Result"
        open={showAddResult}
        footer={[
          <Button key='add'
            style={{
              backgroundColor: '#1f883d',
              color: '#fff',
            }}
            onClick={() => {
              setShowAddResult(false)
              setResult({})
              openModal()
            }}>
            Add Another
          </Button>,
          <Button key='done' type='primary' onClick={() => {
            setShowAddResult(false)
            setResult({})
            // refresh the device list
            setLoading(true)
            requestDevicesInfo().then((data) => {
              setDevices(data)
            })
              .catch((error) => {
                console.error(error)
                notification.error({
                  message: 'Get device list fail',
                  description: error,
                })
                setDevices([])
              })
              .finally(() => {
                setLoading(false)
              })
          }}>
            Done
          </Button>
        ]}
      >
        <p><b>Device ID:</b> {String(result.did).padStart(8, '0')}</p>
        <p><b>Device Name:</b> {result.name}</p>
        <p><b>Device Type:</b> {result.type}</p>
        <p><b>Device Location:</b> {result.location}</p>
        <p>
          Use the Device ID to connect your device to the server.
          See the <Link onClick={() => setShowDocModal(true)}>documentation</Link> for more information.
        </p>
      </Modal>
      <Modal
        title="Modify Device"
        open={showModifyModal}
        onOk={handleModifyOk}
        confirmLoading={comfirmLoading}
        onCancel={handleModifyCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button key='delete' type='primary' danger loading={deleteLoading}
              onClick={() => {
                confirm({
                  title: 'Are you sure to delete this device?',
                  icon: <ExclamationCircleOutlined />,
                  content: 'This action cannot be undone!',
                  okText: 'Delete',
                  okType: 'danger',
                  cancelText: 'Cancel',
                  centered: true,
                  onOk() {
                    setDeleteLoading(true)
                    axios.post(`${import.meta.env.VITE_API_URL}/api/device/delete`, {
                      did: modifyDevice.did,
                    }, {
                      withCredentials: true
                    }).then((response) => {
                      if (response.status !== 200 || response.data === 'fail') {
                        throw new Error('Request Fail')
                      }
                      setShowModifyModal(false)
                      setDeleteLoading(false)
                      notification.success({
                        message: 'Delete device success',
                        description: 'The device has been deleted',
                      })
                      setLoading(true)
                      requestDevicesInfo(setLoading).then((data) => {
                        setDevices(data)
                      })
                        .catch((error) => {
                          console.error(error)
                          notification.error({
                            message: 'Get device list fail',
                            description: error,
                          })
                          setDevices([])
                        })
                        .finally(() => {
                          setLoading(false)
                        })
                    }).catch((error) => {
                      console.error('Request Fail:', error)
                      setDeleteLoading(false)
                      notification.error({
                        message: 'Delete device fail',
                        description: error,
                      })
                    })
                  },
                  onCancel() {
                    console.log('Cancel')
                  },
                })
              }}
            >
              Delete
            </Button>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <Form
          form={modifyForm}
          name="modify-device"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item
            name="did"
            label="Device ID"
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="name"
            label="Device Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Device Type"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Device Location"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
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
    </div>
  )
}