import { useRegisterForm } from "@/hooks/useRegisterForm";
import InputField from "@/components/inputs/inputField";
import InputPassword from "@/components/inputs/inputPassword";
import Button from "@/components/buttons/button";
import Notification from "@/components/notifications/notification";
import "./registerForm.css";

const RegisterForm = ({ isRegistered, setIsRegistered, googleData = null }) => {
  const {
    formData,
    errors,
    loading,
    showNotification,
    handleChange,
    handleSubmit,
  } = useRegisterForm(setIsRegistered, googleData);

  const isGoogle = !!googleData;

  return (
    <>
      {showNotification && <Notification message="¡Registro exitoso!" type="success" />}

      <form className="register-form" onSubmit={handleSubmit}>
        <InputField
          label="Nickname"
          type="text"
          name="username"
          autocomplete="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {errors.username && <span className="error-message">{errors.username}</span>}

        {!isGoogle && (
          <>
            <InputField
              label="Correo"
              type="email"
              name="email"
              autocomplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}

            <InputPassword
              label="Contraseña"
              name="password"
              autocomplete="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}

            <InputPassword
              label="Confirmar contraseña"
              name="confirm_password"
              autocomplete="new-password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
            {errors.confirm_password && <span className="error-message">{errors.confirm_password}</span>}
          </>
        )}

        <Button
          text={loading ? "Registrando..." : "Registrarse"}
          type="submit"
          onClick={handleSubmit}
          disabled={isRegistered}
        />
      </form>
    </>
  );
};

export default RegisterForm;
