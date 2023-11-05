import { useState, useEffect } from "react"
import { Card, Row, Col, Statistic, Carousel, Table, List, FloatButton } from "antd"
import { PieChart, Pie, Sector, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { IconLocation } from '@arco-design/web-react/icon';
import Map from "./Map"

function requestDevicesData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        active: 698,
        total: 1020,
      })
    }, 1000)
  })
}



function requestMessagesData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        normal: 255,
        warning: 144,
        error: 53,
        today: 452,
      })
    }, 1000)
  })
}

function requestMessagesDailyData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: '2023/10/20',
          Normal: 255,
          Warning: 144,
          Error: 53,
        },
        {
          name: '2023/10/21',
          Normal: 360,
          Warning: 56,
          Error: 22,
        },
        {
          name: '2023/10/22',
          Normal: 220,
          Warning: 30,
          Error: 10,
        },
        {
          name: '2023/10/23',
          Normal: 380,
          Warning: 250,
          Error: 52,
        },
        {
          name: '2023/10/24',
          Normal: 520,
          Warning: 130,
          Error: 25,
        },
        {
          name: '2023/10/25',
          Normal: 320,
          Warning: 55,
          Error: 19,
        },
        {
          name: '2023/10/26',
          Normal: 310,
          Warning: 35,
          Error: 23,
        },
      ])
    }, 1000)
  })
}

function requestLatestMessagesData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          device: 'Device 1',
          message: 'This is a message',
          messageType: 'Normal',
          time: '2023/10/20 10:20:30',
          location: "116.482086,39.990496"
        },
        {
          device: 'Device 2',
          message: 'This is a message',
          messageType: 'Warning',
          time: '2023/10/21 11:21:31',
          location: '116.482087,39.990497',
        },
        {
          device: 'Device 3',
          message: 'This is a message',
          messageType: 'Error',
          time: '2023/10/22 12:22:32',
          location: '116.482088,39.990498',
        },
        {
          device: 'Device 4',
          message: 'This is a message',
          messageType: 'Normal',
          time: '2023/10/23 13:23:33',
          location: '116.482089,39.990499',
        },
        {
          device: 'Device 5',
          message: 'This is a message',
          messageType: 'Normal',
          time: '2023/10/24 14:24:34',
          location: '116.482090,39.990500',
        },
        {
          device: 'Device 6',
          message: 'This is a message',
          messageType: 'Warning',
          time: '2023/10/25 15:25:35',
          location: '116.482091,39.990501',
        },
        {
          device: 'Device 7',
          message: 'This is a message',
          messageType: 'Error',
          time: '2023/10/26 16:26:36',
          location: '116.482092,39.990502',
        },
        {
          device: 'Device 8',
          message: 'This is a message',
          messageType: 'Normal',
          time: '2023/10/27 17:27:37',
          location: '116.482093,39.990503',
        },
        {
          device: 'Device 9',
          message: 'This is a message',
          messageType: 'Normal',
          time: '2023/10/28 18:28:38',
          location: '116.482094,39.990504',
        },
        {
          device: 'Device 10',
          message: 'This is a message',
          messageType: 'Warning',
          time: '2023/10/29 19:29:39',
          location: '116.482095,39.990505',
        },
      ])
    }, 1000)
  })
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

function requestMostDevicesMessagesData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          device: 'Device 10',
          num: 344
        },
        {
          device: 'Device 1',
          num: 255,
        },
        {
          device: 'Device 2',
          num: 144,
        },
        {
          device: 'Device 4',
          num: 120
        },
        {
          device: 'Device 3',
          num: 53,
        },
      ])
    }, 1000)
  })
}

function requestLatestDevicesStatusData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          device: 'Device 1',
          status: 'Normal',
          time: '2023/10/20 10:20:30',
          location: "116.482086,39.990496"
        },
        {
          device: 'Device 2',
          status: 'Warning',
          time: '2023/10/21 11:21:31',
          location: '116.482087,39.990497',
        },
        {
          device: 'Device 3',
          status: 'Error',
          time: '2023/10/22 12:22:32',
          location: '116.482088,39.990498',
        },
        {
          device: 'Device 4',
          status: 'Normal',
          time: '2023/10/23 13:23:33',
          location: '116.482089,39.990499',
        },
        {
          device: 'Device 5',
          status: 'Normal',
          time: '2023/10/24 14:24:34',
          location: '116.482090,39.990500',
        },
        {
          device: 'Device 6',
          status: 'Warning',
          time: '2023/10/25 15:25:35',
          location: '116.482091,39.990501',
        },
        {
          device: 'Device 7',
          status: 'Error',
          time: '2023/10/26 16:26:36',
          location: '116.482092,39.990502',
        },
        {
          device: 'Device 8',
          status: 'Normal',
          time: '2023/10/27 17:27:37',
          location: '116.482093,39.990503',
        },
        {
          device: 'Device 9',
          status: 'Normal',
          time: '2023/10/28 18:28:38',
          location: '116.482094,39.990504',
        },
        {
          device: 'Device 10',
          status: 'Warning',
          time: '2023/10/29 19:29:39',
          location: '116.482095,39.990505',
        },
      ])
    }, 1000)
  })
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

  const [activeDevicesIndex, setActiveDevicesIndex] = useState(0);
  const [activeMessagesIndex, setActiveMessagesIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [devicesData, setDevicesData] = useState({});
  const [loadingDevicesData, setLoadingDevicesData] = useState(false);
  const [messagesData, setMessagesData] = useState({});
  const [loadingMessagesData, setLoadingMessagesData] = useState(false);
  const [messagesDailyData, setMessagesDailyData] = useState([]);
  const [loadingMessagesDailyData, setLoadingMessagesDailyData] = useState(false);
  const [latestMessagesData, setLatestMessagesData] = useState([]);
  const [loadingLatestMessagesData, setLoadingLatestMessagesData] = useState(false);
  const [mostDevicesMessagesData, setMostDevicesMessagesData] = useState([]);
  const [loadingMostDevicesMessagesData, setLoadingMostDevicesMessagesData] = useState(false);
  const [latestDevicesStatusData, setLatestDevicesStatusData] = useState([]);
  const [loadingLatestDevicesStatusData, setLoadingLatestDevicesStatusData] = useState(false);
  const [groupLatestDevicesStatusData, setGroupLatestDevicesStatusData] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    setLoadingDevicesData(true);
    requestDevicesData().then((res) => {
      setDevicesData(res);
      setLoadingDevicesData(false);
    })
    setLoadingMessagesData(true);
    requestMessagesData().then((res) => {
      setMessagesData(res);
      setLoadingMessagesData(false);
    })
    setLoadingMessagesDailyData(true);
    requestMessagesDailyData().then((res) => {
      setMessagesDailyData(res);
      setLoadingMessagesDailyData(false);
    })
    setLoadingLatestMessagesData(true);
    requestLatestMessagesData().then((res) => {
      setLatestMessagesData(res);
      setLoadingLatestMessagesData(false);
    })
    setLoadingMostDevicesMessagesData(true);
    requestMostDevicesMessagesData().then((res) => {
      setMostDevicesMessagesData(res);
      setLoadingMostDevicesMessagesData(false);
    })
    setLoadingLatestDevicesStatusData(true);
    requestLatestDevicesStatusData().then((res) => {
      setLatestDevicesStatusData(res);
      const groupNumber = 7;
      setGroupLatestDevicesStatusData(Array.from({ length: Math.ceil(latestDevicesStatusData.length / groupNumber) }, (_, index) => (
        latestDevicesStatusData.slice(index * groupNumber, index * groupNumber + groupNumber)
      )))
      setLoadingLatestDevicesStatusData(false);
      console.log(groupLatestDevicesStatusData)
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
                      value={messagesData.normal + messagesData.warning + messagesData.error}
                      loading={loadingMessagesData}
                    />
                  </Col>
                </Row>
                <Row gutter={36}>
                  <Col xs={24}>
                    <Statistic
                      title="Messages Today"
                      value={messagesData.today}
                      loading={loadingMessagesData}
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
                                  item.status === 'Normal' ? <CheckCircleOutlined style={{ fontSize: 24, color: '#1f883d' }} /> :
                                    item.status === 'Warning' ? <ExclamationCircleOutlined style={{ fontSize: 24, color: '#f5b50a' }} /> :
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