import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    const mapSDK = window.MapmyIndia;
    if (mapSDK) {
      // Use the MapmyIndia SDK here
      // You can access mapSDK.Map, mapSDK.MapView, etc. to interact with the map
      const map = new mapSDK.Map('map', {
        center: [28.6139, 77.2090],
        zoom: 12,
      });

      // Add map-related functionality here
    }
  }, []);

  return <div id="map" style={{ width: '100vw', height: '60vh'}}></div>;
};

export default MapComponent;
