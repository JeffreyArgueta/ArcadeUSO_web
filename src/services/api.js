import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/user/`, userData);
};

export const getUserByUsername = async (userUsername) => {
  try {
    const response = await axios.get(`${API_URL}/user/username/${userUsername}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error obteniendo usuario por username:", error.response?.data || error.message);
    throw error;
  }
};

export const getUserByEmail = async (userEmail) => {
  try {
    const response = await axios.get(`${API_URL}/user/email/${userEmail}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error obteniendo usuario por email:", error.response?.data || error.message);
    throw error;
  }
};

export const updateUser = async (idUser, userData) => {
  try {
    const response = await axios.put(`${API_URL}/user/${idUser}`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Si necesitas autenticación
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error actualizando usuario:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("❌ Error en login:", error.response?.data || error.message);
    throw error;
  }
};

export const loginWithGoogle = async (code) => {
  try {
    const response = await axios.get(`${API_URL}/auth/google/login?code=${code}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error en login con Google:", error.response?.data || error.message);
    throw error;
  }
};

export const registerWithGoogle = async (googleUserData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/google/register`, googleUserData);
    return response.data;
  } catch (error) {
    console.error("❌ Error registrando usuario con Google:", error.response?.data || error.message);
    throw error;
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_URL}/auth/refresh-token`, {}, {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    return response.data.token;
  } catch (error) {
    console.error("❌ Error renovando token:", error.response?.data || error.message);
    throw error;
  }
};

export const getGoogleAuthURL = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/google/auth-url`);
    return response.data.url;
  } catch (error) {
    console.error("❌ Error obteniendo URL de autenticación:", error.response?.data || error.message);
    throw error;
  }
};
