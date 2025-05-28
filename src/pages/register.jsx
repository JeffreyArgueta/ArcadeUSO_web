import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Modal from '@/components/modals/modal';
import RegisterForm from '../components/forms/registerForm';
import Link from '@/components/links/link';

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClose = () => {
    navigate(location.state?.from || "/login");
  };

  // Verifica si viene de Google
  const googleData = {
    email: searchParams.get("email") || null,
    google_id: searchParams.get("google_id") || null,
    name: searchParams.get("name") || null,
    refreshToken: searchParams.get("refreshToken") || null,
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Solo redirigir si el usuario está en una página de autenticación
        if (decodedToken?.exp * 1000 > Date.now()) {
          navigate("/dashboard");
        } else {
          localStorage.removeItem("token"); // ✅ Borra el token solo si expiró
        }
      } catch (error) {
        console.error("❌ Error decodificando token:", error);

        // Solo eliminar el token si realmente hay un problema con su estructura
        if (error instanceof SyntaxError || error.message.includes("Invalid token")) {
          localStorage.removeItem("token");
        }
      }
    }
  }, [navigate]);

  const isGoogleRegister = !!googleData.email && !!googleData.google_id;

  return (
    <div className='overlay'>
      <Modal title={'Registrarse en ArcadeUSO'} onClose={handleClose} disabled={isRegistered}>
        <RegisterForm
          isRegistered={isRegistered}
          setIsRegistered={setIsRegistered}
          googleData={isGoogleRegister ? googleData : null}
        />
        <Link
          text='¿Ya tienes una cuenta?'
          href={'/login'}
          texthref={'Inicia sesión'}
          disabled={isRegistered}
        />
      </Modal>
    </div>
  );
};

export default Register;
