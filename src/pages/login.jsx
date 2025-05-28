import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginWithGoogle } from "@/services/api";
import Modal from "@/components/modals/modal";
import GoogleButton from "@/components/buttons/googleButton";
import Separator from "@/components/separators/separator";
import LoginForm from "@/components/forms/loginForm";
import Link from "@/components/links/link";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirigir al usuario al flujo de autenticación de Google
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/login/google`;
  };

  // Procesar el callback de Google al regresar al sitio
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="overlay">
      <Modal title={"Inicia Sesión en ArcadeUSO"} onClose={() => navigate(location.state?.from || "/")}>
        <GoogleButton text="Continuar con Google" onClick={handleGoogleLogin} />
        <Separator text="o inicia sesión con" />
        <LoginForm />
        <Link text="¿No tienes una cuenta?" href={"/register"} texthref={"Regístrate aquí"} />
      </Modal>
    </div>
  );
};

export default Login;
