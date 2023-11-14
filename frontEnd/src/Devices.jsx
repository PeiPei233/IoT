import { Flex, Card, Spin, Empty, Button, FloatButton, Form, Input, Modal, App, message, notification } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'

const { confirm } = Modal
const { Search } = Input

async function requestDevicesInfo() {
  try {
    const response = await axios.get('http://localhost:8080/api/device/list', {
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
  const [addForm] = Form.useForm()
  const [modifyForm] = Form.useForm()

  useEffect(() => {
    setLoading(true)
    requestDevicesInfo().then((data) => {
      setDevices(data)
    })
    .catch((error) => {
      console.error(error)
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
      axios.post('http://localhost:8080/api/device/add', {
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
        setComfirmLoading(false)
        setShowAddResult(true)
        setResult({
          'did': response.data,
          'name': values.name,
          'type': values.type,
          'location': values.location,
          'status': 'Online'
        })
        addForm.resetFields()
      }).catch((error) => {
        console.error('Request Fail:', error)
        setComfirmLoading(false)
        message.error('Add device fail')
      })
    }).catch((info) => {
      console.log('Validate Failed:', info)
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
      axios.post('http://localhost:8080/api/device/update', {
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
                title={device.name}
                style={{ width: 300, margin: '1em' }}
                hoverable
                onClick={() => {
                  setShowModifyModal(true)
                  setModifyDevice(device)
                  modifyForm.setFieldsValue({
                    did: device.did,
                    name: device.name,
                    type: device.type,
                    location: device.location,
                  })
                }}
              >
                <p><b>Device ID:</b> {device.did}</p>
                <p><b>Type:</b> {device.type}</p>
                <p><b>Location:</b> {device.location}</p>
                <p><b>Status:</b> {device.status}</p>
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
        <p><b>Device ID:</b> {result.did}</p>
        <p><b>Device Name:</b> {result.name}</p>
        <p><b>Device Type:</b> {result.type}</p>
        <p><b>Device Location:</b> {result.location}</p>
        <p>
          Use the Device ID to connect your device to the server.
          See the <a href='' target='_blank'>documentation</a> for more information.
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
                  content: 'This action cannot be undone.',
                  okText: 'Delete',
                  okType: 'danger',
                  cancelText: 'Cancel',
                  centered: true,
                  onOk() {
                    setDeleteLoading(true)
                    axios.post('http://localhost:8080/api/device/delete', {
                      did: modifyDevice.did,
                    }, {
                      withCredentials: true
                    }).then((response) => {
                      if (response.status !== 200 || response.data === 'fail') {
                        throw new Error('Request Fail')
                      }
                      setShowModifyModal(false)
                      setDeleteLoading(false)
                      setLoading(true)
                      requestDevicesInfo(setLoading).then((data) => {
                        setDevices(data)
                      })
                      .catch((error) => {
                        console.error(error)
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
    </div>
  )
}