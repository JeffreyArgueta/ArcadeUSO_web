import PropTypes from "prop-types";
import { handleGoogleLogin } from "@/utils/authUtils";
import { handleClose } from "@/utils/handleClose";
import Modal from "@/components/Modal";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import styles from "./Login.module.css";

const Login = ({ setContainer, form, setForm, isLogged, setIsLogged, isRegistered, setIsRegistered, handlebackground, handleButton }) => {
  const title = (form === "register" ? "Registrarse en ArcadeUSO" : "Inicia Sesión en ArcadeUSO");
  const isDisabled = form === "login" ? isLogged : form === "register" ? isRegistered : false;

  return (
    <>
      <Modal title={title} onClose={() => handleClose(form, setForm, setContainer)} disabled={isDisabled} >
        {form === "register" ? (
          <RegisterForm
            className={styles.RegisterForm}
            errorClass={styles.errorMessage}
            isRegistered={isRegistered}
            setIsRegistered={setIsRegistered}
            handleButton={handleButton}
            switchToLogin={() => setForm("login")}
          />
        ) : (
          <LoginForm
            className={styles.LoginForm}
            errorClass={styles.errorMessage}
            handleGoogleLogin={handleGoogleLogin}
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            setIsRegistered={setIsRegistered}
            handlebackground={handlebackground}
            handleButton={handleButton}
            switchToRegister={() => setForm("register")}
          />
        )}
      </Modal>
    </>
  );
};

Login.propTypes = {
  setContainer: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
  setForm: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  setIsLogged: PropTypes.func.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  setIsRegistered: PropTypes.func.isRequired,
  handleMusic: PropTypes.func,
};

export default Login;
