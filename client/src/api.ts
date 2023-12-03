import axios from 'axios';
const REST_API_SERVER = 'http://localhost:8000';
type Position = { lat: number; lng: number };

export const createApiClient = () => {
  return {
    generateRandomCoordinates: async (
      position: Position,
      radius: number,
      unit: string
    ) => {
      return axios.get(`${REST_API_SERVER}/generateRandomCoordinates`, {
        params: {
          latitude: position.lat,
          longitude: position.lng,
          radius: radius,
          unit: unit,
        },
      });
    },
    doesGoalOccurs: async (
      ballPosition: Position,
      goalPosition: Position,
      goalDistance: number,
      unit: string
    ) => {
      return axios.get(`${REST_API_SERVER}/doesGoalOccurs`, {
        params: {
          ballLatitude: ballPosition.lat,
          ballLongitude: ballPosition.lng,
          goalLatitude: goalPosition.lat,
          goalLongitude: goalPosition.lng,
          goalDistance,
        },
      });
    },
  };
};
