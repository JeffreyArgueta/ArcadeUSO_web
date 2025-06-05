import PropTypes from "prop-types";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import Notification from "@/components/Notification";
import InputField from "@/components/InputField";
import InputPassword from "@/components/InputPassword";
import Button from "@/components/Button";
import Link from "@/components/Link";

const RegisterForm = ({ className, errorClass, isRegistered, setIsRegistered, googleData = null, switchToLogin, handleButton }) => {
  const { formData, errors, loading, showNotification, setShowNotification, handleChange, handleSubmit } =
    useRegisterForm(setIsRegistered, googleData, switchToLogin);

  const isGoogle = !!googleData;

  const handleClick = () => {
    handleButton.play();
    handleSubmit();
  };

  return (
    <>
      {
        showNotification &&
        <Notification
          message="¡Registro exitoso!"
          type="success"
          onClose={() => setShowNotification(false)}
        />
      }

      <form className={className} onSubmit={handleSubmit}>
        <InputField
          label="Nickname"
          type="text"
          name="username"
          autocomplete="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="3 a 12 caracteres"
        />
        {errors.username && <span className={errorClass}>{errors.username}</span>}

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
              placeholder="example@email.com"
            />
            {errors.email && <span className={errorClass}>{errors.email}</span>}

            <InputPassword
              label="Contraseña"
              name="password"
              autocomplete="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className={errorClass}>{errors.password}</span>}

            <InputPassword
              label="Confirmar contraseña"
              name="confirm_password"
              autocomplete="new-password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
            {errors.confirm_password && <span className={errorClass}>{errors.confirm_password}</span>}
          </>
        )}

        <Button text={loading ? "Registrando..." : "Registrarse"} type="submit" onClick={handleClick} disabled={isRegistered} />
        <Link text="¿Ya tienes una cuenta? " href={switchToLogin} texthref={"Inicia sesión"} disabled={isRegistered} />
      </form>
    </>
  );
};

RegisterForm.propTypes = {
  className: PropTypes.string,
  errorClass: PropTypes.string,
  isRegistered: PropTypes.bool.isRequired,
  setIsRegistered: PropTypes.func.isRequired,
  googleData: PropTypes.object,
  switchToLogin: PropTypes.func.isRequired,
};

export default RegisterForm;
