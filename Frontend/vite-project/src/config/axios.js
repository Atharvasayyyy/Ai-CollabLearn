import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    "Authorization": "bearer ${localStorage.getitem('token')}  ",
  },
});

// Add token to requests if it exists
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
