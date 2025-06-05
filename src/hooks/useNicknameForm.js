import { useState } from "react";
import { getUserByUsername, updateUser } from "@/services/api";

export const useNicknameForm = (user, setUser, setIsNicknameUpdated, switchToDashboard) => {
  const [formData, setFormData] = useState({ username: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const validateField = async (name, value) => {
    let error = "";

    if (!value.trim()) {
      error = "El nickname es obligatorio.";
    } else if (name === "username") {
      if (value.length < 3 || value.length > 12) {
        error = "El nickname es inválido [3-12 caracteres].";
      } else {
        const isTaken = await getUserByUsername(value);
        if (isTaken) error = "Este nickname ya está en uso.";
      }
    }

    return error;
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));

    if (name === "username") {
      const error = await validateField(name, value);

      setErrors((prevErrors) => {
        if (prevErrors[name] !== error) {
          return { ...prevErrors, [name]: error };
        }
        return prevErrors;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let newErrors = {};
    const requiredFields = ["username"];

    await Promise.all(
      requiredFields.map(async (field) => {
        newErrors[field] = await validateField(field, formData[field]);
      })
    );

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await updateUser(user.id_user, { username: formData.username });

      if (response) { setUser(response); }
      else { console.error("🚨 La actualización no devolvió datos válidos."); }

      setIsNicknameUpdated(true);
      setShowNotification(true);

      setTimeout(() => { switchToDashboard(); }, 3200);
    } catch (error) {
      console.error("❌ Error actualizando nickname:", error);
    }

    setLoading(false);
  };

  return { formData, errors, loading, showNotification, setShowNotification, handleChange, handleSubmit };
};
