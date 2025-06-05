import { jwtDecode } from "jwt-decode";
import { loginWithGoogle } from "@/services/api";

export const getGoogleCode = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("code");
};

export const processGoogleLogin = async (setForm, setIsLogged) => {
  const code = getGoogleCode();
  // if (!code) return;
  if (!code) return false;

  try {
    const data = await loginWithGoogle(code);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setIsLogged(true);
      return true;
    } else if (data.email) {
      setForm("register");
      return false;
    }
  } catch (error) {
    console.error("❌ Error en login con Google:", error);
    return false
  }
};

export const validateToken = (setIsLogged) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken?.exp * 1000 > Date.now()) {
      setIsLogged(true);
      return true;
    } else {
      localStorage.removeItem("token");
      return false;
    }
  } catch (error) {
    console.error("❌ Error decodificando token:", error);
    localStorage.removeItem("token");
  }
};

export const handleGoogleLogin = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google/auth-url`);
    const { url } = await res.json();
    window.location.href = url;
  } catch (error) {
    console.error("❌ Error obteniendo URL de Google:", error);
  }
};
