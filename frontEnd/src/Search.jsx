import { useState, useEffect } from "react";
import { Card, Select, Form, Table, DatePicker, Row, Col, Button, App } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Map from "./Map";

const { RangePicker } = DatePicker;

function requestOptionDevices() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          value: '1234561',
          label: 'Device 1'
        },
        {
          value: '1234562',
          label: 'Device 2'
        },
        {
          value: '1234563',
          label: 'Device 3'
        },
        {
          value: '1234564',
          label: 'Device 4'
        },
        {
          value: '1234565',
          label: 'Device 5'
        },
        {
          value: '1234566',
          label: 'Device 6'
        },
        {
          value: '1234567',
          label: 'Device 7'
        },
        {
          value: '1234568',
          label: 'Device 8'
        },
        {
          value: '1234569',
          label: 'Device 9'
        },
        {
          value: '12345610',
          label: 'Device 10'
        },
        {
          value: '12345611',
          label: 'Device 11'
        },
        {
          value: '12345612',
          label: 'Device 12'
        },
        {
          value: '12345613',
          label: 'Device 13'
        },
        {
          value: '12345614',
          label: 'Device 14'
        },
        {
          value: '12345615',
          label: 'Device 15'
        },
        {
          value: '12345616',
          label: 'Device 16'
        },
        {
          value: '12345617',
          label: 'Device 17'
        },
        {
          value: '12345618',
          label: 'Device 18'
        },
        {
          value: '12345619',
          label: 'Device 19'
        },
        {
          value: '12345620',
          label: 'Device 20'
        },
        {
          value: '12345621',
          label: 'Device 21'
        },
        {
          value: '12345622',
          label: 'Device 22'
        },
      ])
    }, 1000)
  })
}

const columns = [
  {
    title: 'Device ID',
    dataIndex: 'deviceID',
    key: 'deviceID',
  },
  {
    title: 'Device Name',
    dataIndex: 'deviceName',
    key: 'deviceName',
  },
  {
    title: 'Device Type',
    dataIndex: 'deviceType',
    key: 'deviceType',
  },
  {
    title: 'Device Status',
    dataIndex: 'deviceStatus',
    key: 'deviceStatus',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  }
];

function requestSearchResults() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          deviceID: '10000',
          deviceName: 'Device 1',
          deviceType: 'Type 1',
          deviceStatus: 'Normal',
          time: '2023/11/12 10:15:30',
          location: '119.150,30.160'
        },
        {
          deviceID: '10000',
          deviceName: 'Device 1',
          deviceType: 'Type 1',
          deviceStatus: 'Warning',
          time: '2023/11/12 12:45:00',
          location: '119.200,30.200'
        },
        {
          deviceID: '10000',
          deviceName: 'Device 1',
          deviceType: 'Type 1',
          deviceStatus: 'Critical',
          time: '2023/11/12 14:30:15',
          location: '119.250,30.250'
        },
        {
          deviceID: '10000',
          deviceName: 'Device 1',
          deviceType: 'Type 1',
          deviceStatus: 'Offline',
          time: '2023/11/12 16:05:45',
          location: '119.300,30.300'
        },
        {
          deviceID: '10000',
          deviceName: 'Device 1',
          deviceType: 'Type 1',
          deviceStatus: 'Normal',
          time: '2023/11/12 18:20:30',
          location: '119.350,30.350'
        }
      ])
    }, 1000)
  })
}

export default function Searching() {

  const [form] = Form.useForm()
  const [options, setOptions] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [loadingOptions, setLoadingOptions] = useState(false)

  const { message, modal, notification } = App.useApp()
  
  useEffect(() => {
    setLoadingOptions(true)
    requestOptionDevices().then((res) => {
      setLoadingOptions(false)
      setOptions(res)
      if (res.length === 0) {
        notification.info({
          message: 'No devices found',
          description: 'Please add devices first',
        });
      }
    })
  }, [])

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    setSearching(true)
    requestSearchResults().then((res) => {
      setSearchResults(res)
      setSearching(false)
    })
  }

  return (
    <div>
      <h1>Search Device Info</h1>
      <Card width='100%'>
        <Form
          layout="horizontal"
          form={form}
          onFinish={onFinish}
        >
          <Row
            gutter={24}
            justify="space-between"
            align="middle"
          >
            <Col xs={24} md={11}>
              <Form.Item label='Device Name' name='did'>
                <Select
                  showSearch
                  width='100%'
                  placeholder="Select a device"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={options}
                  loading={loadingOptions}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={11}>
              <Form.Item label='Time Range' name='timeRange'>
                <RangePicker
                  width='100%'
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={2}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  <SearchOutlined />
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card width='100%' style={{ marginTop: '20px' }}>
        <Table
          columns={columns}
          dataSource={searchResults}
          pagination={false}
          scroll={{ y: 400, x: 550 }}
          loading={searching}
        />
        {searchResults.length !== 0 && <Map
          style={{
            height: 500,
            width: '100%',
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            marginTop: 20
          }}
          path={
            searchResults.map((item) => {
              return [+item.location.split(',')[0], +item.location.split(',')[1]]
            })
          }
        />}
      </Card>
    </div>
  )
}