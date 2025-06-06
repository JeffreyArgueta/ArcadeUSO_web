import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Obtener todas las partidas al Buscaminas
export const getAllMinesweeperGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/minesweeper`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error obteniendo todas las partidas:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener una partida por ID
export const getMinesweeperGameById = async (idMine) => {
  try {
    const response = await axios.get(`${API_URL}/minesweeper/${idMine}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error obteniendo partida por ID:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener partidas por usuario
export const getMinesweeperGamesByUser = async (idUser) => {
  try {
    const response = await axios.get(`${API_URL}/minesweeper/user/${idUser}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error obteniendo partidas del usuario:", error.response?.data || error.message);
    throw error;
  }
};

// Crear una nueva partida al Buscaminas
export const createMinesweeperGame = async (gameData) => {
  try {
    const response = await axios.post(`${API_URL}/minesweeper`, gameData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error creando partida:", error.response?.data || error.message);
    throw error;
  }
};

// Actualizar una partida existente
export const updateMinesweeperGame = async (idMine, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/minesweeper/${idMine}`, updatedData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error actualizando partida:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar una partida
export const deleteMinesweeperGame = async (idMine) => {
  try {
    const response = await axios.delete(`${API_URL}/minesweeper/${idMine}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error eliminando partida:", error.response?.data || error.message);
    throw error;
  }
};
