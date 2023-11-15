import { useState, useEffect } from "react"
import { Card, Row, Col, Statistic, Carousel, Table, List, FloatButton, App, notification } from "antd"
import { PieChart, Pie, Sector, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { IconLocation } from '@arco-design/web-react/icon';
import { useNavigate } from "react-router-dom";
import Map from "./Map"
import axios from "axios";

async function requestDevicesData() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/device/briefInfo`, {
    withCredentials: true
  });
  return response.data;
}

async function requestMessagesData() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/message/briefInfo`, {
    withCredentials: true
  });
  return response.data;
}

async function requestMessagesDailyData() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/message/recentCount`, {
    withCredentials: true
  });
  return response.data.map((data) => ({
    name: data.time,
    Normal: data.normal,
    Warning: data.warning,
    Error: data.error
  }));
}

async function requestLatestMessagesData() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/message/latest`, {
    withCredentials: true
  });
  return response.data.map((data) => ({
    device: data.deviceName,
    messageType: data.type,
    message: data.message,
    time: data.time,
    location: data.location
  }));
}

const latestMessagesColumns = [
  {
    title: 'Device',
    dataIndex: 'device',
    key: 'device',
  },
  {
    title: 'Message Type',
    dataIndex: 'messageType',
    key: 'messageType',
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
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
  },
]

async function requestMostDevicesMessagesData() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/message/mostCount`, {
    withCredentials: true
  });
  return response.data.map((data) => ({
    device: data.deviceName,
    num: data.total
  }));
}

async function requestLatestDevicesStatusData() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/message/latestDevice`, {
    withCredentials: true
  });
  return response.data.map((data) => ({
    device: data.deviceName,
    status: data.type,
    time: data.time,
    location: data.location
  }));
}

const renderActiveShape = (props) => {
  // console.log(props)
  const RADIAN = Math.PI / 180;
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * 270);
  const cos = Math.cos(-RADIAN * 270);
  const mx = cx + (outerRadius + innerRadius * 2 * 0.3) * cos;
  const my = cy + (outerRadius + innerRadius * 2 * 0.3) * sin;
  const ex = mx;
  const ey = my;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={18}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + innerRadius * 2 * 0.03}
        outerRadius={outerRadius + innerRadius * 2 * 0.06}
        fill={fill}
      />
      <text x={ex} y={ey} textAnchor='middle' fill={fill} fontSize={20}>{`${value}`}</text>
      <text x={ex} y={ey} dy={18} textAnchor='middle' fill='#999'>
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

export default function Home() {

  const navigate = useNavigate();
  const { message, modal, notification } = App.useApp();

  const [activeDevicesIndex, setActiveDevicesIndex] = useState(0);
  const [activeMessagesIndex, setActiveMessagesIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [devicesData, setDevicesData] = useState({});
  const [loadingDevicesData, setLoadingDevicesData] = useState(true);
  const [messagesData, setMessagesData] = useState({});
  const [loadingMessagesData, setLoadingMessagesData] = useState(true);
  const [messagesDailyData, setMessagesDailyData] = useState([]);
  const [loadingMessagesDailyData, setLoadingMessagesDailyData] = useState(true);
  const [latestMessagesData, setLatestMessagesData] = useState([]);
  const [loadingLatestMessagesData, setLoadingLatestMessagesData] = useState(true);
  const [mostDevicesMessagesData, setMostDevicesMessagesData] = useState([]);
  const [loadingMostDevicesMessagesData, setLoadingMostDevicesMessagesData] = useState(true);
  const [latestDevicesStatusData, setLatestDevicesStatusData] = useState([]);
  const [loadingLatestDevicesStatusData, setLoadingLatestDevicesStatusData] = useState(true);
  const [groupLatestDevicesStatusData, setGroupLatestDevicesStatusData] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    requestDevicesData().then((res) => {
      setDevicesData(res);
      setLoadingDevicesData(false);
    }).catch((err) => {
      console.log(err);
      notification.error({
        message: 'Request failed!',
        description: err.message,
      });
    })

    requestMessagesData().then((res) => {
      setMessagesData(res);
      setLoadingMessagesData(false);
    }).catch((err) => {
      console.log(err);
      notification.error({
        message: 'Request failed!',
        description: err.message,
      });
    })

    requestMessagesDailyData().then((res) => {
      setMessagesDailyData(res);
      setLoadingMessagesDailyData(false);
    }).catch((err) => {
      console.log(err);
      notification.error({
        message: 'Request failed!',
        description: err.message,
      });
    })
    
    requestLatestMessagesData().then((res) => {
      setLatestMessagesData(res);
      setLoadingLatestMessagesData(false);
    }).catch((err) => {
      console.log(err);
      notification.error({
        message: 'Request failed!',
        description: err.message,
      });
    })
    
    requestMostDevicesMessagesData().then((res) => {
      setMostDevicesMessagesData(res);
      setLoadingMostDevicesMessagesData(false);
    }).catch((err) => {
      console.log(err);
      notification.error({
        message: 'Request failed!',
        description: err.message,
      });
    })
    
    requestLatestDevicesStatusData().then((res) => {
      setLatestDevicesStatusData(res);
      const groupNumber = 7;
      setGroupLatestDevicesStatusData(Array.from({ length: Math.ceil(res.length / groupNumber) }, (_, index) => (
        res.slice(index * groupNumber, index * groupNumber + groupNumber)
      )))
      setLoadingLatestDevicesStatusData(false);
      console.log(groupLatestDevicesStatusData)
    }).catch((err) => {
      console.log(err);
      notification.error({
        message: 'Request failed!',
        description: err.message,
      });
    })
    

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  const onDevicesPieEnter = (_, index) => {
    setActiveDevicesIndex(index);
  }

  const onMessagesPieEnter = (_, index) => {
    setActiveMessagesIndex(index);
  }

  return (
    <div>
      <h1>Home</h1>
      <Row gutter={[36, 36]} style={{ marginBottom: 36 }}>
        <Col xs={24} md={8}>
          <Card style={{ height: "100%" }}>
            <Statistic
              title="Active / Total Devices"
              value={devicesData.active}
              suffix={`/ ${devicesData.total}`}
              loading={loadingDevicesData}
            />
            {!loadingDevicesData &&
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    activeIndex={activeDevicesIndex}
                    activeShape={renderActiveShape}
                    data={[
                      {
                        name: 'Active',
                        value: devicesData.active,
                        fill: '#1f883d'
                      },
                      {
                        name: 'Inactive',
                        value: devicesData.total - devicesData.active,
                        fill: '#c50f1f'
                      },
                    ]}
                    cx="50%"
                    cy="45%"
                    innerRadius="50%"
                    outerRadius="60%"
                    dataKey="value"
                    onMouseEnter={onDevicesPieEnter}
                  />
                </PieChart>
              </ResponsiveContainer>}
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card style={{ height: "100%" }}>
            <Row gutter={36} align="middle">
              <Col xs={24} md={10} lg={7}>
                <Row gutter={36}>
                  <Col xs={24}>
                    <Statistic
                      title="Total Messages"
                      value={messagesData.total}
                      loading={loadingMessagesData}
                    />
                  </Col>
                </Row>
                <Row gutter={36}>
                  <Col xs={24}>
                    <Statistic
                      title="Messages Today"
                      value={!loadingMessagesDailyData && messagesDailyData[messagesDailyData.length - 1].Normal + messagesDailyData[messagesDailyData.length - 1].Warning + messagesDailyData[messagesDailyData.length - 1].Error}
                      loading={loadingMessagesDailyData}
                    />
                    {!loadingMessagesData &&
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            activeIndex={activeMessagesIndex}
                            activeShape={renderActiveShape}
                            data={[
                              {
                                name: 'Normal',
                                value: messagesData.normal,
                                fill: '#1f883d'
                              },
                              {
                                name: 'Warning',
                                value: messagesData.warning,
                                fill: '#f5b50a'
                              },
                              {
                                name: 'Error',
                                value: messagesData.error,
                                fill: '#c50f1f'
                              },
                            ]}
                            cx="50%"
                            cy="45%"
                            innerRadius="50%"
                            outerRadius="60%"
                            dataKey="value"
                            onMouseEnter={onMessagesPieEnter}
                          />
                        </PieChart>
                      </ResponsiveContainer>}
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={14} lg={17}>
                {!loadingMessagesDailyData &&
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={messagesDailyData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: -30,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Area type="monotone" dataKey="Normal" stackId="1" stroke="#1f883d" fill="#1f883d" />
                      <Area type="monotone" dataKey="Warning" stackId="1" stroke="#f5b50a" fill="#f5b50a" />
                      <Area type="monotone" dataKey="Error" stackId="1" stroke="#c50f1f" fill="#c50f1f" />
                    </AreaChart>
                  </ResponsiveContainer>}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={[36, 36]} style={{ marginBottom: 36 }}>
        <Col xs={24}>
          <Card>
            <Row gutter={[36, 36]}>
              <Col xs={24} md={16}>
                <h3>Latest Messages</h3>
                <Table
                  dataSource={latestMessagesData}
                  columns={latestMessagesColumns}
                  pagination={false}
                  scroll={{ y: 240, x: true }}
                  loading={loadingLatestMessagesData}
                />
              </Col>
              <Col xs={24} md={8}>
                <h3>Most Messages Devices Today</h3>
                {!loadingMostDevicesMessagesData &&
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={mostDevicesMessagesData}
                      margin={{
                        top: 20,
                        right: 0,
                        left: 0,
                        bottom: 20,
                      }}
                      layout="vertical"
                      barSize={20}
                    >
                      <YAxis dataKey="device" type="category" scale="band" axisLine={false}
                        tickLine={false} />
                      <XAxis type="number" hide />
                      <Tooltip />
                      <Bar dataKey="num" fill="#1f883d" />
                    </BarChart>
                  </ResponsiveContainer>}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={[36, 36]} style={{ marginBottom: 36 }}>
        <Col xs={24}>
          <Card loading={loadingLatestDevicesStatusData}>
            <Row gutter={[36, 36]}>
              <Col md={24} lg={16}>
                <h3>Latest Devices Location</h3>
                {!loadingLatestDevicesStatusData &&
                  <Map
                    style={{
                      height: windowWidth < 768 ? windowWidth - 166 : 500,
                      width: windowWidth < 768 ? windowWidth - 166 : '100%',
                      borderRadius: 8,
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    }}
                    markers={latestDevicesStatusData.map((data) => (
                      {
                        position: [+data.location.split(',')[0], +data.location.split(',')[1]],
                        title: data.device,
                      }
                    ))}
                  />}
              </Col>
              <Col md={24} lg={8}>
                <h3>Latest Devices Status</h3>
                {!loadingLatestDevicesStatusData && groupLatestDevicesStatusData.length !== 0 &&
                  <Carousel autoplay>
                    {console.log(groupLatestDevicesStatusData)}{
                      groupLatestDevicesStatusData.map((data, index) => (
                        <div key={index}>
                          <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={
                                    item.status.toLowerCase() === 'normal' ? <CheckCircleOutlined style={{ fontSize: 24, color: '#1f883d' }} /> :
                                      item.status.toLowerCase() === 'warning' ? <ExclamationCircleOutlined style={{ fontSize: 24, color: '#f5b50a' }} /> :
                                        <CloseCircleOutlined style={{ fontSize: 24, color: '#c50f1f' }} />
                                  }
                                  title={item.device}
                                  description={item.time}
                                />
                                <div><IconLocation height={12} /> {item.location} </div>
                              </List.Item>
                            )}
                          />
                        </div>
                      ))}
                  </Carousel>}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <FloatButton.BackTop visibilityHeight={0} />
    </div>
  )
}