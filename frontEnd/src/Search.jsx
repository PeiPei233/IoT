import { useState, useEffect } from "react";
import { Card, Select, Form, Table, DatePicker, Row, Col, Button, App } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Map from "./Map";
import axios from "axios";
import { reGeoCode } from "./utils";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

const dateFormatter = Intl.DateTimeFormat('zh', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
}).format;

async function requestOptionDevices() {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/device/list`, {
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
  },
  {
    title: 'Device Name',
    dataIndex: 'device',
  },
  {
    title: 'Message Type',
    dataIndex: 'type',
  },
  {
    title: 'Message',
    dataIndex: 'message',
  },
  {
    title: 'Message Value',
    dataIndex: 'value',
  },
  {
    title: 'Time',
    dataIndex: 'time',
  },
  {
    title: 'Location',
    dataIndex: 'location',
  },
  {
    title: 'Device Status',
    dataIndex: 'status',
  }
];

export default function Searching() {

  const navigate = useNavigate()

  const [form] = Form.useForm()
  const [options, setOptions] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [loadingOptions, setLoadingOptions] = useState(false)

  const { message, modal, notification } = App.useApp()

  useEffect(() => {
    setLoadingOptions(true)
    requestOptionDevices().then((res) => {
      setOptions(res)
      if (res.length === 0) {
        notification.info({
          message: 'No devices found',
          description: 'Please add devices first',
        });
      }
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        notification.error({
          message: 'Please login first!',
          description: 'You have not logged in yet, please log in first!',
        });
        navigate('/');
      } else {
        notification.error({
          message: 'Failed to get devices',
          description: err.message,
        });
      }
    }).finally(() => {
      setLoadingOptions(false)
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
          console.log(response.data)
          const res = response.data.map((data) => (
            reGeoCode(data.lng, data.lat).then((res) => ({
              deviceID: String(values.did).padStart(8, '0'),
              device: data.deviceName,
              type: data.type === 0 ? 'Normal' : data.type === 1 ? 'Warning' : 'Error',
              status: data.status === 0 ? 'Normal' : data.status === 1 ? 'Warning' : 'Error',
              time: dateFormatter(new Date(data.timestamp)),
              location: res,
              lng: data.lng,
              lat: data.lat,
              message: data.message,
              value: data.value,
              key: data.mid
            })).catch((err) => ({
              deviceID: String(values.did).padStart(8, '0'),
              device: data.deviceName,
              type: data.type === 0 ? 'Normal' : data.type === 1 ? 'Warning' : 'Error',
              status: data.status === 0 ? 'Normal' : data.status === 1 ? 'Warning' : 'Error',
              time: dateFormatter(new Date(data.timestamp)),
              location: `${data.lng},${data.lat}`,
              lng: data.lng,
              lat: data.lat,
              message: data.message,
              value: data.value,
              key: data.mid
            }))
          ));
          Promise.all(res).then((res) => {
            setSearchResults(res);
          }).catch((err) => {
            console.log(err);
            notification.error({
              message: 'Search failed!',
              description: err.message,
            });
          })
        }
      })
      .catch(error => {
        console.error('Request Fail:', error);
        if (error.response && error.response.status === 401) {
          notification.error({
            message: 'Please login first!',
            description: 'You have not logged in yet, please log in first!',
          });
          navigate('/');
        } else {
          notification.error({
            message: 'Search failed!',
            description: error.message,
          });
        }
      }).finally(() => {
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
          scroll={{ y: 400, x: 768 }}
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
              return [item.lng, item.lat]
            })
          }
          markers={
            searchResults.map((item) => {
              return {
                position: [item.lng, item.lat],
                title: item.device,
                data: item
              }
            })
          }
        />}
      </Card>
    </div>
  )
}