import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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
