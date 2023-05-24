import axios from 'axios';
import { API_URL, X_SECRET_KEY, userData } from '../constants/constants';

const apiAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'x-secret-key': X_SECRET_KEY,
    'X-Api-App-id': userData.client_secret,
  },
});

apiAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default apiAxios;
