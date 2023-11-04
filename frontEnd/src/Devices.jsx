import { Flex, Card, Spin, Empty, Button, FloatButton, Form, Input, Modal, App } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { confirm } = Modal
const { Search } = Input

function requestDevicesInfo(setLoading) {
  setLoading(true)
  return new Promise((resolve) => {
    setTimeout(() => {
      setLoading(false)
      resolve([
        {
          'did': '1234567890',
          'name': 'Device 1',
          'type': 'Temperature Sensor',
          'location': 'Room 1',
          'status': 'Online'
        },
        {
          'did': '1234567891',
          'name': 'Device 2',
          'type': 'Temperature Sensor',
          'location': 'Room 2',
          'status': 'Online'
        },
        {
          'did': '1234567892',
          'name': 'Device 3',
          'type': 'Temperature Sensor',
          'location': 'Room 3',
          'status': 'Online'
        },
        {
          'did': '1234567893',
          'name': 'Device 4',
          'type': 'Temperature Sensor',
          'location': 'Room 4',
          'status': 'Online'
        },
        {
          'did': '1234567894',
          'name': 'Device 5',
          'type': 'Temperature Sensor',
          'location': 'Room 5',
          'status': 'Online'
        },
        {
          'did': '1234567895',
          'name': 'Device 6',
          'type': 'Temperature Sensor',
          'location': 'Room 6',
          'status': 'Online'
        },
        {
          'did': '1234567896',
          'name': 'Device 7',
          'type': 'Temperature Sensor',
          'location': 'Room 7',
          'status': 'Online'
        },
        {
          'did': '1234567897',
          'name': 'Device 8',
          'type': 'Temperature Sensor',
          'location': 'Room 8',
          'status': 'Online'
        },
        {
          'did': '1234567898',
          'name': 'Device 9',
          'type': 'Temperature Sensor',
          'location': 'Room 9',
          'status': 'Online'
        },
        {
          'did': '1234567899',
          'name': 'Device 10',
          'type': 'Temperature Sensor',
          'location': 'Room 10',
          'status': 'Online'
        },
        {
          'did': '1234567800',
          'name': 'Device 11',
          'type': 'Temperature Sensor',
          'location': 'Room 11',
          'status': 'Online'
        }
      ])
    }, 2000)
  })
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
    requestDevicesInfo(setLoading).then((data) => {
      setDevices(data)
    })
  }, [])

  function onSearch(value) {
    setSearch(value)
  }

  function handleOk() {
    setComfirmLoading(true)
    addForm.validateFields().then((values) => {
      console.log(values)
      setTimeout(() => {
        setOpenAddModal(false)
        setComfirmLoading(false)
        setShowAddResult(true)
        setResult({
          'did': '9876543210',
          'name': values.name,
          'type': values.type,
          'location': values.location,
          'status': 'Online'
        })
        addForm.resetFields()
      }, 2000)
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
      setTimeout(() => {
        setShowModifyModal(false)
        setComfirmLoading(false)
        requestDevicesInfo(setLoading).then((data) => {
          setDevices(data)
        })
      }, 2000)
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
        {!loading && devices.length > 0 &&
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
          name="control-ref"
        >
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
            requestDevicesInfo(setLoading).then((data) => {
              setDevices(data)
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
                    setTimeout(() => {
                      setShowModifyModal(false)
                      setDeleteLoading(false)
                      requestDevicesInfo(setLoading).then((data) => {
                        setDevices(data)
                      })
                    }, 2000)
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
          name="control-ref"
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