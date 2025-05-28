import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, registerWithGoogle } from "@/services/api";
import { checkUsernameAvailability } from "@/services/userValidation";
import { checkEmailAvailability } from "@/services/emailValidation";

export const useRegisterForm = (setIsRegistered, googleData = null) => {
  const navigate = useNavigate();
  const isGoogle = !!googleData;

  const [formData, setFormData] = useState({
    username: "",
    email: isGoogle ? googleData.email : "",
    password: "",
    confirm_password: "",
    authentication_method: isGoogle ? "google" : "manual",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Cargar datos de Google al montar si están disponibles
  useEffect(() => {
    if (isGoogle && googleData.name) {
      setFormData((prev) => ({
        ...prev,
        username: googleData.name.replace(/\s+/g, "").toLowerCase(),
      }));
    }
  }, [googleData]);

  const validateField = async (name, value) => {
    let error = "";

    if (!value.trim()) {
      if (name === "username") { error = "El nickname es obligatorio." }
      else if (name === "email") { error = "El correo es obligatorio." }
      else if (name === "password") { error = "La contraseña es obligatoria." }
    } else if (name === "username") {
      const isAvailable = await checkUsernameAvailability(value);
      if (!isAvailable) error = "Este nickname ya está en uso.";
    } else if (name === "email") {
      const isAvailable = await checkEmailAvailability(value);
      if (!isAvailable) error = "Este correo ya está en uso.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));

    if (["username", "email", "password"].includes(name)) {
      await validateField(name, value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let formValid = true;

    if (!isGoogle) {
      const requiredFields = ["username", "email", "password", "confirm_password"];

      await Promise.all(
        requiredFields.map(async (field) => {
          if (field === "confirm_password" && formData.password.trim() !== formData.confirm_password.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, confirm_password: "Las contraseñas deben coincidir." }));
            formValid = false;
          } else {
            await validateField(field, formData[field]);
            if (errors[field]) formValid = false;
          }
        })
      );
    }

    if (!formValid) {
      setLoading(false);
      return;
    }

    try {
      if (isGoogle) {
        await registerWithGoogle({
          username: formData.username,
          email: formData.email,
          google_id: googleData.google_id,
          refreshToken: googleData.refreshToken,
        });
      } else {
        const { confirm_password, ...dataToSend } = formData;
        await registerUser(dataToSend);
      }

      setIsRegistered(true);
      setShowNotification(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("❌ Error al registrar usuario:", error);
    }

    setLoading(false);
  };

  return {
    formData,
    errors,
    loading,
    showNotification,
    handleChange,
    handleSubmit,
  };
};
