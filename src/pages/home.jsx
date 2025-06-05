import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSound } from "@/context/soundContext";
import { validateToken, processGoogleLogin } from "@/utils/authUtils";
import Notification from "@/components/Notification";
import Login from "@/components/Login";
import VolumeControl from "@/components/VolumeControl";
import backgroundImage from "@/assets/background.gif";
// import backgroundImage from "@/assets/BG Inicio 2.gif";
// import backgroundImage from "@/assets/screenplay.png";
import styles from "./Home.module.css";

const Home = () => {
  const { sounds } = useSound();
  const { click, button, background } = sounds;
  const [container, setContainer] = useState("screenplay");
  const [form, setForm] = useState("login");
  const [isLogged, setIsLogged] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const isStartDisabled = isLogged;

  const navigate = useNavigate();

  const handleAuth = useCallback(async () => {
    const isLoggedIn = await processGoogleLogin(setForm, setIsLogged);
    if (isLoggedIn) {
      setShowNotification(true);
      setTimeout(() => { navigate("/Dashboard") }, 2500);
    }
  }, [setForm, setIsLogged, navigate]);

  const handleClick = useCallback(() => {
    click.play();
    if (validateToken(setIsLogged)) {
      setShowNotification(true);
      setTimeout(() => { navigate("/Dashboard"); }, 2500);
    } else { setTimeout(() => { setContainer("login") }, 250) }
  }, [click, setIsLogged]);

  useEffect(() => {
    background.play();
    handleAuth();
    return () => background.pause();
  }, [click, background, handleAuth]);

  return (
    <div className={styles.Overlay} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.Container}>
        {showNotification && (
          <Notification
            message="¡Inicio de sesión exitoso!"
            type="success"
            onClose={() => setShowNotification(false)}
          />
        )}
        <VolumeControl />
        {container === "login" ? (
          <Login
            setContainer={() => setContainer("screenplay")}
            form={form}
            setForm={setForm}
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            isRegistered={isRegistered}
            setIsRegistered={setIsRegistered}
            handlebackground={background}
            handleButton={button}
            navigate={navigate}
          />
        ) : (
          <>
            <div className={styles.gameTitle}>
              <h1 className={styles.titleText}>Arcade</h1>
              <h1 className={styles.titleText}>USO</h1>
            </div>
            <button className={styles.startButton} onClick={handleClick} disabled={isStartDisabled} aria-label="Iniciar el juego">
              TOCAR PARA COMENZAR
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
