import React, { useEffect, useState } from 'react';
import MapCall from './MapCall';

const calculateDistance = (lat1, lon1, lat2, lon2) => {// calculating the distance between two locations
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =// just math
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(2); // Distance rounded to 2 decimal places
};

const deg2rad = (degrees) => {// converts degree into radian
  return degrees * (Math.PI / 180);
};

const SetCadetLoc = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [cadetLocations, setCadetLocations] = useState([]);
  const [distances, setDistances] = useState([]);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      } catch (error) {
        console.error(error);
      }
    };

    const simulatedCadetLocations = [
      { id: 1, latitude: 18.922557, longitude: 72.834432 },
      { id: 2, latitude: 26.621055, longitude: 80.850662 },
      { id: 3, latitude: 18.398745, longitude: 76.563557 },
    ];

    getUserLocation();
    setCadetLocations(simulatedCadetLocations);
  }, []);

  useEffect(() => {
    const calculateDistances = () => {
      if (userLocation && cadetLocations.length > 0) {
        const distances = cadetLocations.map((cadet) => {
          
          const distance = calculateDistance(//passing arguments(user location and cadet location) to the distance calulating function
            userLocation.latitude,
            userLocation.longitude,
            cadet.latitude,
            cadet.longitude
          );
          
          return {
            id: cadet.id,
            distance: distance,
          };
        });
        setDistances(distances);
      }
    };

    calculateDistances();
  }, [userLocation, cadetLocations]);

  const Radar = () => {
    if (!userLocation) {
      return null; // Return null if userLocation is null
    }

    const { latitude: yourLat, longitude: yourLng } = userLocation;

    return (
      <div>
        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              backgroundColor: 'skyblue',
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
          </div>
          {cadetLocations.map((cadet) => {
            const { latitude: cadetLat, longitude: cadetLng } = cadet;
            const dx = cadetLng - yourLng;
            const dy = cadetLat - yourLat;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            const x = Math.cos(angle) * distance * 5; // Adjust the scaling factor (5) as needed
            const y = Math.sin(angle) * distance * 5; // Adjust the scaling factor (5) as needed

            return (
              <div
                key={`${cadetLat}-${cadetLng}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(${x}px, ${y}px)`,
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'red',
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3>Your Location:</h3>
      {userLocation && (
        <div>
          Latitude: {userLocation.latitude}, Longitude: {userLocation.longitude}
        </div>
      )}
      <h3>Distances from Your Location:</h3>
      <ul>
        {distances.map((item) => (
          <li key={item.id}>
            Cadet ID: {item.id}, Distance: {item.distance} km
          </li>
        ))}
      </ul>
      <Radar />
      <MapCall />
    </div>
  );
};

export default SetCadetLoc;
