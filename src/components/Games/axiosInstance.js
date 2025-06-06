import axios from 'axios';

const token = localStorage.getItem('token'); // Se espera que el frontend principal lo haya guardado

const axiosInstance = axios.create({
  baseURL: 'https://api.tu-dominio.com', // reemplaza cuando tu API esté lista
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
});

export default axiosInstance;