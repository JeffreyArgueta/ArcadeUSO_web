import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getUserByEmail } from "@/services/api";

export const useLoginForm = (setIsLogged, handlebackground, handleButton) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() ? "" : `${name === "email" ? "El correo" : "La contraseña"} es obligatorio.`,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!formData.email.trim() || !formData.password.trim()) {
      setErrors({
        email: formData.email.trim() ? "" : "El correo es obligatorio.",
        password: formData.password.trim() ? "" : "La contraseña es obligatoria.",
      });
      setLoading(false);
      return;
    }

    const emailExists = await getUserByEmail(formData.email);
    if (!emailExists) {
      setErrors({ email: "El correo no está registrado." });
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser(formData);
      localStorage.setItem("token", response.token);
      setIsLogged(true);
      setShowNotification(true);
      setTimeout(() => {
        handlebackground.stop();
        navigate("/Dashboard");
      }, 2500);
    } catch (error) {
      if (error.response?.status === 401) {
        setErrors({ password: "La contraseña es incorrecta." });
      } else {
        console.error("Error en el inicio de sesión:", error);
        setErrors({ general: "Ocurrió un error inesperado. Intenta nuevamente más tarde." });
      }
    }

    setLoading(false);
  };

  return {
    formData,
    errors,
    loading,
    showNotification,
    setShowNotification,
    handleChange,
    handleSubmit,
  };
};
