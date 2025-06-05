import PropTypes from "prop-types";
import { useLoginForm } from "@/hooks/useLoginForm";
import Notification from "@/components/Notification";
import InputField from "@/components/InputField";
import InputPassword from "@/components/InputPassword";
import Button from "@/components/Button";
import Link from "@/components/Link";
import Separator from "@/components/Separator";
import googleIcon from '@/assets/google.png';

const Login = ({ className, errorClass, handleGoogleLogin, isLogged, setIsLogged, setIsRegistered, switchToRegister, handlebackground, handleButton }) => {
  const { formData, errors, loading, showNotification, setShowNotification, handleChange, handleSubmit } =
    useLoginForm(setIsLogged, handlebackground, handleButton);

  const handleHref = (e) => {
    e.preventDefault();
    setIsRegistered(false);
    switchToRegister();
  };

  const handleClick = () => {
    handleButton.play();
    handleSubmit();
  };

  const handleClickGoogle = () => {
    handleButton.play();
    handleGoogleLogin();
  };

  return (
    <>
      {
        showNotification &&
        <Notification
          message="¡Inicio de Sesión Exitoso!"
          type="success"
          onClose={() => setShowNotification(false)}
        />
      }

      <Button text="Continuar con Google" image={googleIcon} alt="Google Logo" onClick={handleClickGoogle} disabled={isLogged} />
      <Separator text="o inicia sesión con" />

      <form className={className} onSubmit={handleSubmit}>
        <InputField
          label="Correo"
          type="email"
          name="email"
          autocomplete="email"
          value={formData.email}
          onChange={handleChange}
          required
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

        <Button text={loading ? "Cargando..." : "Iniciar Sesión"} type="submit" onClick={handleClick} disabled={isLogged} />
        <Link text="¿No tienes una cuenta? " href={handleHref} texthref={"Regístrate aquí"} disabled={isLogged} />
      </form>
    </>
  );
};

Login.propTypes = {
  className: PropTypes.string,
  errorClass: PropTypes.string,
  handleGoogleLogin: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  setIsLogged: PropTypes.func.isRequired,
  setIsRegistered: PropTypes.func.isRequired,
  switchToRegister: PropTypes.func.isRequired,
  handleMusic: PropTypes.func,
};

export default Login;
