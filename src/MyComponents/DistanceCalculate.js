import React, { useEffect, useState } from 'react';
import MapCall from './MapCall';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(2); // Distance rounded to 2 decimal places
};

const deg2rad = (degrees) => {
  return degrees * (Math.PI / 180);
};

const DistCadet = ({ userLocation, cadetLocations }) => {
  const [distances, setDistances] = useState([]);

  useEffect(() => {
    const calculateDistances = () => {
      const distances = cadetLocations.map((cadet) => {
        const distance = calculateDistance(
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
    };

    calculateDistances();
  }, [userLocation, cadetLocations]);

  return (
    <div>
      <h3>Distances from Your Location:</h3>
      <ul>
        {distances.map((item) => (
          <li key={item.id}>
            Cadet ID: {item.id}, Distance: {item.distance} km
          </li>
        ))}
      </ul>
      <MapCall />
    </div>
  );
};

export default DistCadet;
