import React from 'react';

function Radar({ userLocation, cadetLocations }) {
  const { latitude: yourLat, longitude: yourLng } = userLocation; // Assuming userLocation is an object with latitude and longitude properties

  return (
    <div>
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'red',
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Your Location
        </div>
        {cadetLocations.map((cadet) => {
          const { id, latitude: cadetLat, longitude: cadetLng } = cadet;

          const dx = cadetLng - yourLng;
          const dy = cadetLat - yourLat;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          const x = Math.cos(angle) * distance * 5; // Adjust the scaling factor (5) as needed
          const y = Math.sin(angle) * distance * 5; // Adjust the scaling factor (5) as needed

          return (
            <div
              key={id}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(${x}px, ${y}px)`,
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: 'blue',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Radar;
