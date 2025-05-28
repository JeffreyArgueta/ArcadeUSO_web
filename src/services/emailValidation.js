import { getUserByEmail } from "@/services/api";

export const checkEmailAvailability = async (email) => {
  if (!email.trim()) return false;

  try {
    await getUserByEmail(email);
    return false; // Correo ya registrado
  } catch (error) {
    if (error.response?.status === 404) {
      return true; // Correo disponible
    }
    console.error("Error inesperado en verificación:", error);
    return false;
  }
};
