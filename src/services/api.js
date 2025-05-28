import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/user/register`, userData);
};

export const getUserByUsername = async (userUsername) => {
  return axios.get(`${API_URL}/user/username/${userUsername}`)
}

export const getUserByEmail = async (userEmail) => {
  return axios.get(`${API_URL}/user/email/${userEmail}`)
}

export const getGoogleAuthURL = async () => {
  const response = await axios.get(`${API_URL}/auth/google/auth-url`);
  return response.data.authURL; // Devuelve la URL de autenticación
};

export const loginWithGoogle = async (code) => {
  const response = await axios.get(`${API_URL}/auth/login/google?code=${code}`);
  return response.data; // Devolverá el token y otra información necesaria
};

export const registerWithGoogle = async (googleUserData) => {
  const response = await axios.post(`${API_URL}/register/google`, googleUserData);
  return response.data; // Devuelve el token y los datos del usuario
};

export const refreshToken = async (refreshToken) => {
  const response = await axios.post(`${API_URL}/refresh-token`, null, {
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
  return response.data.token; // Devuelve el nuevo JWT
};
