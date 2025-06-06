import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// 🔥 Obtener todos los intentos al Gachapon
export const getAllAttempts = async () => {
  try {
    const response = await axios.get(`${API_URL}/gachapon_attempts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error obteniendo intentos al Gachapon:", error.response?.data || error.message);
    throw error;
  }
};

// 🔥 Obtener intentos de un usuario
export const getAttemptsByUser = async (idUser) => {
  try {
    const response = await axios.get(`${API_URL}/gachapon_attempts/user/${idUser}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Error obteniendo intentos del usuario ID ${idUser}:`, error.response?.data || error.message);
    throw error;
  }
};

// 🔥 Crear un intento al Gachapon
export const createAttempt = async (attemptData) => {
  try {
    const response = await axios.post(`${API_URL}/gachapon_attempts`, attemptData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error creando intento al Gachapon:", error.response?.data || error.message);
    throw error;
  }
};

// 🔥 Actualizar un intento al Gachapon
export const updateAttempt = async (idAttempt, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/gachapon_attempts/${idAttempt}`, updatedData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Error actualizando intento ID ${idAttempt}:`, error.response?.data || error.message);
    throw error;
  }
};

// 🔥 Eliminar un intento al Gachapon
export const deleteAttempt = async (idAttempt) => {
  try {
    const response = await axios.delete(`${API_URL}/gachapon_attempts/${idAttempt}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Error eliminando intento ID ${idAttempt}:`, error.response?.data || error.message);
    throw error;
  }
};
