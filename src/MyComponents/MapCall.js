import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    const mapSDK = window.MapmyIndia;
    if (mapSDK) {
      const map = new mapSDK.Map('map', {
        center: [13.02528, 80.2062336],
        zoom: 14,
      });
    }
  }, []);

  return <div id="map" style={{ width: '100vw', height: '60vh'}}></div>;
};

export default MapComponent;
