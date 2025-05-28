import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/services/api";
import { checkUsernameAvailability } from "@/services/userValidation";
import { checkEmailAvailability } from "../services/emailValidation";

export const useRegisterForm = (setIsRegistered) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    authentication_method: "manual",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const validateField = async (name, value) => {
    let error = "";

    if (!value.trim()) {
      error = `${name === "username" ? "El nickname" : "El correo"} es obligatorio.`;
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

    if (["username", "email"].includes(name)) {
      await validateField(name, value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const requiredFields = ["username", "email", "password", "confirm_password"];
    let formValid = true;

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

    if (!formValid) {
      setLoading(false);
      return;
    }

    const { confirm_password, ...dataToSend } = formData;

    try {
      await registerUser(dataToSend);
      setIsRegistered(true);
      setShowNotification(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
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
