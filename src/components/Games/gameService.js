// gameService.js
import axiosInstance from './axiosInstance';
import { jwtDecode } from 'jwt-decode';

function getUserIdFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.sub || decoded.userId || decoded.id || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}


export async function saveGame(gameState) {
  const userId = getUserIdFromToken();
  if (!userId) throw new Error('No user ID found');
  return axiosInstance.put(`/partida/${userId}`, gameState);
}

export async function loadGame() {
  const userId = getUserIdFromToken();
  if (!userId) throw new Error('No user ID found');
  const res = await axiosInstance.get(`/partida/${userId}`);
  return res.data;
}

export async function deleteGame() {
  const userId = getUserIdFromToken();
  if (!userId) throw new Error('No user ID found');
  return axiosInstance.delete(`/partida/${userId}`);
}
