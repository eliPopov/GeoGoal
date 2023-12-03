import React, { useEffect, useState } from 'react';
import './App.css';
import { createApiClient } from './api';
import GoogleMapReact from 'google-map-react';

function App() {
  const [ballPosition, setBallPosition] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });
  const [goalPosition, setGoalPosition] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });
  const raduis = 1;
  const raduisUnit = 'kilometers';
  const goalDistance = 10;
  const goalDistanceUnit = 'meters';

  const api = createApiClient();
  useEffect(() => {
    getLocation();
    watchLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, handleError);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const watchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(updatePosition, handleError);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleError = (error: any) => {
    let errorStr;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorStr = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorStr = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        errorStr = 'The request to get user location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        errorStr = 'An unknown error occurred.';
        break;
      default:
        errorStr = 'An unknown error occurred.';
    }
    console.error('Error occurred: ' + errorStr);
  };

  const showPosition = (position: any) => {
    setBallPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });

    randomCoordinateRequest();
  };

  const randomCoordinateRequest = async () => {
    const response = await api.generateRandomCoordinates(
      ballPosition,
      raduis,
      raduisUnit
    );

    setGoalPosition(response.data.pos);
  };

  const updatePosition = async (position: any) => {
    setBallPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    console.log('BALL pos: ', ballPosition);

    const response = await api.doesGoalOccurs(
      ballPosition,
      goalPosition,
      goalDistance,
      goalDistanceUnit
    );
    if (response.data.resBool) {
      if (window.confirm('GOAL!')) {
        randomCoordinateRequest();
      }
    }
  };

  const BallComponent = () => (
    <div>
      <img src={'./ball.png'} alt='Example' />
    </div>
  );
  const GoalComponent = () => (
    <div>
      <img src={'./goal.png'} alt='Example' />
    </div>
  );

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCdtGPc2gg0Wh8UWRWDGDy8ChwLNyB5DnI' }}
        defaultCenter={ballPosition}
        defaultZoom={5}
      >
        <BallComponent
          lat={ballPosition.lat}
          lng={ballPosition.lng}
        ></BallComponent>
        <GoalComponent
          lat={goalPosition.lat}
          lng={goalPosition.lng}
        ></GoalComponent>
      </GoogleMapReact>
    </div>
  );
}

export default App;
