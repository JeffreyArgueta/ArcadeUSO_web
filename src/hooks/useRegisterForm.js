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
      error = `${name === "username" ? "El nickname" : "El campo"} es obligatorio.`;
    } else if (name === "username") {
      const isAvailable = await checkUsernameAvailability(value);
      if (!isAvailable) error = "Este nickname ya está en uso.";
    } else if (name === "email" && !isGoogle) {
      const isAvailable = await checkEmailAvailability(value);
      if (!isAvailable) error = "Este correo ya está en uso.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));

    if (["username", "email"].includes(name)) {
      await validateField(name, value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let formValid = true;

    if (!formData.username.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "El nickname es obligatorio." }));
      formValid = false;
    } else {
      await validateField("username", formData.username);
      if (errors.username) formValid = false;
    }

    if (!isGoogle) {
      const requiredFields = ["email", "password", "confirm_password"];

      for (const field of requiredFields) {
        if (!formData[field].trim()) {
          setErrors((prevErrors) => ({ ...prevErrors, [field]: "Este campo es obligatorio." }));
          formValid = false;
        }
      }

      if (formData.password !== formData.confirm_password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirm_password: "Las contraseñas deben coincidir.",
        }));
        formValid = false;
      }

      await validateField("email", formData.email);
      if (errors.email) formValid = false;
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
