import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginWithGoogle } from "@/services/api";
import Modal from "@/components/modals/modal";
import GoogleButton from "@/components/buttons/googleButton";
import Separator from "@/components/separators/separator";
import LoginForm from "@/components/forms/loginForm";
import Link from "@/components/links/link";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  const handleClose = () => {
    navigate(location.state?.from || "/");
  };

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

  // Paso extra: Validar existencia de token en localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken?.exp * 1000 > Date.now()) {
          setIsLogged(true);
          navigate("/dashboard");
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("❌ Error decodificando token:", error);
        localStorage.removeItem("token");
      }
    }
  }, [navigate]);

  return (
    <div className="overlay">
      <Modal title={"Inicia Sesión en ArcadeUSO"} onClose={handleClose} disabled={isLogged}>
        <GoogleButton text="Continuar con Google" onClick={handleGoogleLogin} />
        <Separator text="o inicia sesión con" />
        <LoginForm isLogged={isLogged} setIsLogged={setIsLogged} />
        <Link text="¿No tienes una cuenta?" href={"/register"} texthref={"Regístrate aquí"} />
      </Modal>
    </div>
  );
};

export default Login;
