import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '@/components/modals/modal'
import RegisterForm from '../components/forms/registerForm';
import Link from '@/components/links/link'

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(location.state?.from || "/login"); // Redirige a la ruta anterior o a Home
  };

  return (
    <div className='overlay'>
      <Modal title={'Registrarse en ArcadeUSO'} onClose={handleClose} disabled={isRegistered}>
        <RegisterForm isRegistered={isRegistered} setIsRegistered={setIsRegistered}/>
        <Link text='¿Ya tienes una cuenta?' href={'/login'} texthref={'Inicia sesión'} disabled={isRegistered} />
      </Modal>
    </div>
  );
};

export default Register;
