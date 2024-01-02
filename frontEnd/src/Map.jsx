import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Typography } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { IconLocation, IconClockCircle } from '@arco-design/web-react/icon';
import AMapLoader from '@amap/amap-jsapi-loader';

const { Text } = Typography;

function InfoContent({ device, status, time, location }) {
  return <>
    <div style={{ minWidth: 250 }}>
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 5 }}>{status.toLowerCase() === 'normal' ? <CheckCircleOutlined style={{ color: '#1f883d', marginRight: 10 }} /> :
        status.toLowerCase() === 'warning' ? <ExclamationCircleOutlined style={{ color: '#f5b50a', marginRight: 10 }} /> :
          <CloseCircleOutlined style={{ color: '#c50f1f', marginRight: 10 }} />}{device}</div>
      <div><Text type='secondary'><IconClockCircle height={12} style={{ marginRight: 5 }} />{time}</Text></div>
      <div><Text type='secondary'><IconLocation height={12} style={{ marginRight: 5 }} />{location}</Text></div>
    </div>
  </>
}

export default function Map({ style, markers, path }) {

  const [map, setMap] = useState(null);

  useEffect(() => {
    AMapLoader.load({
      key: import.meta.env.VITE_AMAP_JS_KEY,
      version: "2.0",
    }).then((AMap) => {
      console.log(AMap);
      let center = [116.397428, 39.90923];
      let averageLng = 0;
      let averageLat = 0;
      let count = 0;
      if (markers) {
        for (let i = 0; i < markers.length; i++) {
          averageLng += markers[i].position[0];
          averageLat += markers[i].position[1];
        }
        count += markers.length;
      }
      if (path) {
        for (let i = 0; i < path.length; i++) {
          averageLng += path[i][0];
          averageLat += path[i][1];
        }
        count += path.length;
      }
      if (count > 0) {
        center = [averageLng / count, averageLat / count];
      }
      console.log(center);
      const init_map = new AMap.Map('map', {
        mapStyle: 'amap://styles/whitesmoke',
        viewMode: '2D',
        zoom: 11,
        center: center,
      });
      setMap(init_map);

      var infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -40)
      });

      function openMarkerBox(e) {
        const marker = e.target;
        // render a InfoContent and set the content to the DOM of InfoWindow
        // if not have div with id 'info-content', create one
        if (document.getElementById('info-content')) {
          document.getElementById('info-content').remove();
        }
        const infoContentDiv = document.createElement('div');
        infoContentDiv.setAttribute('id', 'info-content');
        document.body.appendChild(infoContentDiv);
        const data = marker.getExtData().data
        console.log(data)
        ReactDOM.render(<InfoContent device={data.device} status={data.status} time={data.time} location={data.location} />, document.getElementById('info-content'));
        const content = document.getElementById('info-content');
        infoWindow.setContent(content);
        infoWindow.open(init_map, marker.getPosition());
      }

      function closeMarkerBox(e) {
        document.getElementById('info-content').remove();
        infoWindow.close();
      }

      if (markers) {
        for (let i = 0; i < markers.length; i++) {
          const marker = new AMap.Marker({
            position: markers[i].position,
            title: markers[i].title,
            map: init_map
          });
          if (markers[i].data) {
            marker.setExtData({ data: markers[i].data });
            marker.on('mouseover', openMarkerBox);
            marker.on('mouseout', closeMarkerBox);
          }
        }
      }
      if (path) {
        const polyline = new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: '#ffeeff',
          borderWeight: 2,
          strokeColor: "#3366FF",  //线颜色
          strokeOpacity: 1,     //线透明度
          strokeWeight: 3,      //线宽
          strokeStyle: "solid"  //线样式
        });
        polyline.setMap(init_map);
      }
    });

    return () => {
      map?.destroy();
    };
  }, []);

  useEffect(() => {
    AMapLoader.load({
      key: import.meta.env.VITE_AMAP_JS_KEY,
      version: "2.0",
    }).then((AMap) => {
      if (map) {
        map.clearMap();


        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -40)
        });

        function openMarkerBox(e) {
          const marker = e.target;
          // render a InfoContent and set the content to the DOM of InfoWindow
          // if not have div with id 'info-content', create one
          if (document.getElementById('info-content')) {
            document.getElementById('info-content').remove();
          }
          const infoContentDiv = document.createElement('div');
          infoContentDiv.setAttribute('id', 'info-content');
          document.body.appendChild(infoContentDiv);
          const data = marker.getExtData().data
          console.log(data)
          ReactDOM.render(<InfoContent device={data.device} status={data.status} time={data.time} location={data.location} />, document.getElementById('info-content'));
          const content = document.getElementById('info-content');
          infoWindow.setContent(content);
          infoWindow.open(map, marker.getPosition());
        }

        function closeMarkerBox(e) {
          document.getElementById('info-content').remove();
          infoWindow.close();
        }

        if (markers) {
          for (let i = 0; i < markers.length; i++) {
            const marker = new AMap.Marker({
              position: markers[i].position,
              title: markers[i].title,
              map: map
            });
            if (markers[i].data) {
              marker.setExtData({ data: markers[i].data });
              marker.on('mouseover', openMarkerBox);
              marker.on('mouseout', closeMarkerBox);
            }
          }
        }
        if (path) {
          const polyline = new AMap.Polyline({
            path: path,
            isOutline: true,
            outlineColor: '#ffeeff',
            borderWeight: 2,
            strokeColor: "#3366FF",  //线颜色
            strokeOpacity: 1,     //线透明度
            strokeWeight: 3,      //线宽
            strokeStyle: "solid"  //线样式
          });
          polyline.setMap(map);
        }
      }
    });
  }, [markers, path]);

  return (
    <div id="map" style={style}>

    </div>
  );
}
