import axios from 'axios';
const REST_API_SERVER = "http://localhost:3000";

export const createApiClient = () => {
  return {
    generateRandomCoordinates: async (position:any, radius:number, unit:string) => {
      const params = new URLSearchParams()
      params.set('latitude', position.latitude)
      params.set('longitude', position.longitude)
      params.set('radius', radius.toString())
      params.set('unit', unit);

      return axios.get(`${REST_API_SERVER}/generateRandomCoordinates`, { params });
    },
    doesGoalOccurs: async (position:any, goalDistance:number, unit:string) => {
      const params = new URLSearchParams()
      params.set('latitude', position.latitude)
      params.set('longitude', position.longitude)
      params.set('goalDistance', goalDistance.toString())
      params.set('unit', unit);

      return axios.get(`${REST_API_SERVER}/doesGoalOccurs`, { params });
    }
  }}
