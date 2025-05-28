import { useLoginForm } from "@/hooks/useLoginForm";
import InputField from "@/components/inputs/inputField";
import InputPassword from "@/components/inputs/inputPassword";
import Button from "@/components/buttons/Button";
import Notification from "@/components/notifications/Notification";
import "./loginForm.css";

const LoginForm = ({ isLoged, setIsLoged }) => {
  const { formData, errors, loading, showNotification, handleChange, handleSubmit } = useLoginForm(setIsLoged);

  return (
    <>
      {showNotification && <Notification message="¡Inicio de Sesión Exitoso!" type="success" />}

      <form className='login-form' onSubmit={handleSubmit}>
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

        <Button text={loading ? "Cargando..." : "Iniciar Sesión"} type="submit" onClick={handleSubmit} disabled={isLoged} />
      </form>
    </>
  );
};

export default LoginForm;
