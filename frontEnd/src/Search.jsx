import { useState } from "react";
import { Card, Select, Form, Table, DatePicker, Row, Col, Button } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Map from "./Map";

const { RangePicker } = DatePicker;

const options = [
  {
    value: 'Device 1',
    label: 'Device 1'
  },
  {
    value: 'Device 2',
    label: 'Device 2'
  },
  {
    value: 'Device 3',
    label: 'Device 3'
  },
  {
    value: 'Device 4',
    label: 'Device 4'
  },
  {
    value: 'Device 5',
    label: 'Device 5'
  },
  {
    value: 'Device 6',
    label: 'Device 6'
  },
  {
    value: 'Device 7',
    label: 'Device 7'
  },
  {
    value: 'Device 8',
    label: 'Device 8'
  },
  {
    value: 'Device 9',
    label: 'Device 9'
  },
  {
    value: 'Device 10',
    label: 'Device 10'
  },
  {
    value: 'Device 11',
    label: 'Device 11'
  },
  {
    value: 'Device 12',
    label: 'Device 12'
  },
  {
    value: 'Device 13',
    label: 'Device 13'
  },
  {
    value: 'Device 14',
    label: 'Device 14'
  },
  {
    value: 'Device 15',
    label: 'Device 15'
  },
  {
    value: 'Device 16',
    label: 'Device 16'
  },
  {
    value: 'Device 17',
    label: 'Device 17'
  },
  {
    value: 'Device 18',
    label: 'Device 18'
  },
  {
    value: 'Device 19',
    label: 'Device 19'
  },
  {
    value: 'Device 20',
    label: 'Device 20'
  },
  {
    value: 'Device 21',
    label: 'Device 21'
  },
  {
    value: 'Device 22',
    label: 'Device 22'
  },
]

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

const searchResults = [
  {
    deviceID: '10000',
    deviceName: 'Device 1',
    deviceType: 'Type 1',
    deviceStatus: 'Normal',
    time: '2023/11/12 10:15:30',
    location: '119.150,123.160'
  },
  {
    deviceID: '10000',
    deviceName: 'Device 1',
    deviceType: 'Type 1',
    deviceStatus: 'Warning',
    time: '2023/11/12 12:45:00',
    location: '119.200,123.200'
  },
  {
    deviceID: '10000',
    deviceName: 'Device 1',
    deviceType: 'Type 1',
    deviceStatus: 'Critical',
    time: '2023/11/12 14:30:15',
    location: '119.250,123.250'
  },
  {
    deviceID: '10000',
    deviceName: 'Device 1',
    deviceType: 'Type 1',
    deviceStatus: 'Offline',
    time: '2023/11/12 16:05:45',
    location: '119.300,123.300'
  },
  {
    deviceID: '10000',
    deviceName: 'Device 1',
    deviceType: 'Type 1',
    deviceStatus: 'Normal',
    time: '2023/11/12 18:20:30',
    location: '119.350,123.350'
  }
]

export default function Searching() {

  const [form] = Form.useForm()

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
              <Form.Item label='Device Name'>
                <Select
                  showSearch
                  width='100%'
                  placeholder="Select a device"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={options}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={11}>
              <Form.Item label='Time Range'>
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
        />
        <Map style={{
          height: 500,
          width: '100%',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          marginTop: 20
        }} />
      </Card>
    </div>
  )
}