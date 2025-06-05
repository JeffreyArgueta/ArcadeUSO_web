import { useState } from "react";
import { registerUser, registerWithGoogle, getUserByUsername, getUserByEmail } from "@/services/api";

export const useRegisterForm = (setIsRegistered, googleData = null, switchToLogin) => {
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

  const validateField = async (name, value) => {
    let error = "";

    if (!value.trim()) {
      error = name === "username" ? "El nickname es obligatorio."
        : name === "email" ? "El correo es obligatorio."
          : name === "password" ? "La contraseña es obligatoria."
            : "";
    } else {

      if (name === "username") {
        if (value.length < 3 || value.length > 12) {
          error = "El nickname es invalido [3-12 caracteres]";
        } else {
          const isTaken = await getUserByUsername(value);
          if (isTaken) error = "Este nickname ya está en uso."
        }
      } else if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = "El correo no tiene un formato válido.";
        } else {
          const isTaken = await getUserByEmail(value);
          if (isTaken) error = "Este correo ya está en uso.";
        }
      } else if (name === "password") {
        if (value.length < 4) error = "La contraseña debe tener al menos 4 caracteres.";
      }
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
      setTimeout(() => { switchToLogin(); }, 3200);
    } catch (error) {
      console.error("❌ Error al registrar usuario:", error);
    }

    setLoading(false);
  };

  return { formData, errors, loading, showNotification, setShowNotification, handleChange, handleSubmit };
};
