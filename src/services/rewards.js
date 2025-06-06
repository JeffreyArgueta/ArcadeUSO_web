import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Obtener todas las recompensas
export const getAllRewards = async () => {
  try {
    const response = await axios.get(`${API_URL}/reward`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error obteniendo recompensas:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener una recompensa por ID
export const getRewardById = async (idReward) => {
  try {
    const response = await axios.get(`${API_URL}/reward/${idReward}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Error obteniendo recompensa con ID ${idReward}:`, error.response?.data || error.message);
    throw error;
  }
};

// Obtener recompensas por rareza
export const getRewardsByRarity = async (rarity) => {
  try {
    const response = await axios.get(`${API_URL}/reward/rarity/${rarity}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Error obteniendo recompensas con rareza ${rarity}:`, error.response?.data || error.message);
    throw error;
  }
};

// Crear una nueva recompensa
export const createReward = async (rewardData) => {
  try {
    const response = await axios.post(`${API_URL}/reward`, rewardData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error creando recompensa:", error.response?.data || error.message);
    throw error;
  }
};

// Actualizar una recompensa existente
export const updateReward = async (idReward, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/reward/${idReward}`, updatedData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Error actualizando recompensa con ID ${idReward}:`, error.response?.data || error.message);
    throw error;
  }
};

// Eliminar una recompensa
export const deleteReward = async (idReward) => {
  try {
    const response = await axios.delete(`${API_URL}/reward/${idReward}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Error eliminando recompensa con ID ${idReward}:`, error.response?.data || error.message);
    throw error;
  }
};
