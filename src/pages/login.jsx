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

  // Paso 1: Obtener la URL de Google y redirigir
  const handleGoogleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google/auth-url`);
      const { url } = await res.json();
      window.location.href = url;
    } catch (error) {
      console.error("❌ Error obteniendo URL de Google:", error);
    }
  };

  // Paso 2: Procesar el código de Google al regresar
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      loginWithGoogle(code)
        .then((data) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
          } else if (data.email) {
            navigate(
              `/register?email=${data.email}&google_id=${data.google_id}&name=${data.name}&refreshToken=${data.refreshToken}`
            );
          }
        })
        .catch((err) => {
          console.error("❌ Error en login con Google:", err);
        });
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
