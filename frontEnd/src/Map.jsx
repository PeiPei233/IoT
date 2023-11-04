import React, { useEffect } from 'react';

export default function Map({ style }) {
  useEffect(() => {
    if (window.AMapLoader) {
      initMap();
      return;
    }

    window._AMapSecurityConfig = {
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
      version: "2.0",
    }).then((AMap) => {
      console.log(AMap);
      const map = new AMap.Map('map', {
        mapStyle: 'amap://styles/whitesmoke',
        viewMode: '2D',
        zoom: 11,
        center: [116.397428, 39.90923]
      });
      const marker = new AMap.Marker({
        position:[116.39, 39.9],
        title: 'Hello World!'
      })
      map.add(marker);
    });
  }

  return (
    <div id="map" style={style}>
      
    </div>
  );
}
