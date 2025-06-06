// api.js
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


export async function getUserData() {
  const userId = getUserIdFromToken();
  if (!userId) throw new Error('No user ID found');
  const res = await axiosInstance.get(`/users/${userId}`);
  return res.data;
}

export async function updateCoins({ usoCoins, daroCoins }) {
  const userId = getUserIdFromToken();
  if (!userId) throw new Error('No user ID found');
  const res = await axiosInstance.put(`/users/${userId}/coins`, { usoCoins, daroCoins });
  return res.data;
}

export async function submitScore(score) {
  const userId = getUserIdFromToken();
  if (!userId) throw new Error('No user ID found');
  const res = await axiosInstance.post(`/score`, { userId, score });
  return res.data;
}

export async function getTopPlayers() {
  const res = await axiosInstance.get('/leaderboard');
  return res.data;
}
