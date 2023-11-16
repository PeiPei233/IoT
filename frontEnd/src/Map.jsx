import React, { useEffect } from 'react';

export default function Map({ style, markers, path }) {
  useEffect(() => {
    if (window.AMapLoader) {
      initMap();
      return;
    }

    window._AMapSecurityConfig = {
      securityJsCode: import.meta.env.VITE_AMAP_JS_SECURITY_CODE,
    };

    const script = document.createElement('script');
    script.src = "https://webapi.amap.com/loader.js";
    script.async = true;
    script.onload = () => {
      initMap();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function initMap() {
    window.AMapLoader.load({
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
      const map = new AMap.Map('map', {
        mapStyle: 'amap://styles/whitesmoke',
        viewMode: '2D',
        zoom: 11,
        center: center,
      });
      if (markers) {
        for (let i = 0; i < markers.length; i++) {
          const marker = new AMap.Marker({
            position: markers[i].position,
            title: markers[i].title,
            map: map
          });
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
    });
  }

  return (
    <div id="map" style={style}>

    </div>
  );
}
