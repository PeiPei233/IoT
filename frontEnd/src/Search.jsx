import { useState, useEffect } from "react";
import { Card, Select, Form, Table, DatePicker, Row, Col, Button, App } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Map from "./Map";
import axios from "axios";

const { RangePicker } = DatePicker;

async function requestOptionDevices() {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/device/basicList`, {
    withCredentials: true
  });
  return res.data.map((item) => {
    return {
      label: item.name,
      value: item.did
    };
  });
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
    }).catch((err) => {
      setLoadingOptions(false)
      notification.error({
        message: 'Failed to get devices',
        description: err.message,
      });
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
    if (!values.did) {
      notification.error({
        message: 'Please select a device!',
        description: 'You have not selected a device, please select a device first!',
      });
      setSearching(false)
      return
    }
    var url = `${import.meta.env.VITE_API_URL}/api/message/list?did=` + values.did;
    if (values.timeRange) {
      url += '&beginTime=' + values.timeRange[0].format('YYYY-MM-DD') + '&endTime=' + values.timeRange[1].format('YYYY-MM-DD')
    } else {
      url += '&beginTime=&endTime='
    }
    axios.get(url, {
      withCredentials: true
    })
      .then(response => {
        if (response.data.length === 0) {
          notification.info({
            message: 'No results found',
            description: 'Please try again',
          });
        } else {
          setSearchResults(response.data.map((item) => {
            return {
              deviceID: values.did,
              deviceName: item.deviceName,
              deviceType: item.type,
              deviceStatus: item.status,
              time: item.time,
              location: item.location
            }
          }))
        }
        setSearching(false)
      })
      .catch(error => {
        console.error('Request Fail:', error);
        notification.error({
          message: 'Search failed!',
          description: error.message,
        });
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