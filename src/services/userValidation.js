import { getUserByUsername } from "@/services/api";

export const checkUsernameAvailability = async (username) => {
  if (!username.trim()) return false; // Evita llamadas innecesarias

  try {
    await getUserByUsername(username);
    return false; // Usuario ya existe
  } catch (error) {
    if (error.response?.status === 404) {
      return true; // Usuario disponible
    }
    console.error("Error inesperado en verificación:", error);
    return false;
  }
};
