import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import musicNote from "@/assets/music_note.gif";
import background01 from "@/assets/background.gif";
import background02 from "@/assets/BG Inicio 2.gif";
import background03 from "@/assets/screenplay.png";
import points from "@/assets/daro_points.png";
import coins from "@/assets/uso_coins.png";
import user from "@/assets/user.png";
import soundOn from "@/assets/sound_on.png";
import soundOff from "@/assets/sound_off.png";
import passwordOn from "@/assets/password_on.png";
import passwordOff from "@/assets/password_off.png";
import shutdown from "@/assets/shutdown.png";
import google from "@/assets/google.png";
import tarjeta from "@/assets/tarjeta.png";
import cornerUL from "@/assets/corners/upper_left.png";
import cornerUR from "@/assets/corners/upper_right.png";
import cornerBL from "@/assets/corners/bottom_left.png";
import cornerBR from "@/assets/corners/bottom_left.png";
import borderU from "@/assets/borders/up.png";
import borderD from "@/assets/borders/down.png";
import borderL from "@/assets/borders/left.png";
import borderR from "@/assets/borders/right.png";

import styles from "./Loader.module.css";

const imageAssets = [
  musicNote,
  background01,
  background02,
  background03,
  points,
  coins,
  user,
  soundOn,
  soundOff,
  passwordOn,
  passwordOff,
  shutdown,
  google,
  tarjeta,
  cornerUL,
  cornerUR,
  cornerBL,
  cornerBR,
  borderU,
  borderD,
  borderL,
  borderR
];

const loadAssets = () => {
  return Promise.all(imageAssets.map(src =>
    new Promise(resolve => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = () => {
        console.error(`Error cargando imagen: ${src}`);
        resolve();
      };
    })
  ));
};

const Loader = ({ children, isExiting, setIsExiting }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let showMessageTimer, exitTimer, loadingTimer;

    const load = async () => {
      await loadAssets();
      showMessageTimer = setTimeout(() => setShowMessage(true), 1500);
      exitTimer = setTimeout(() => {
        if (typeof setIsExiting === "function") {
          setIsExiting(true);
        }
        loadingTimer = setTimeout(() => setIsLoading(false), 500);
      }, 4500);
    };

    load();

    return () => {
      clearTimeout(showMessageTimer);
      clearTimeout(exitTimer);
      clearTimeout(loadingTimer);
    };
  }, [setIsExiting]);

  if (!isLoading) {
    return children;
  }

  return (
    <>
      <div className={`${styles.loaderContainer} ${isExiting ? styles.exit : styles.enter}`}>
        <div className={styles.loader}>
          <img src={musicNote} alt="Cargando..." className={styles.loadingGif} />
          <p className={`${styles.loadingText} ${showMessage ? styles.setup : ""}`}>
            {showMessage ? "¡Todo listo, buena suerte!" : "Cargando..."}
          </p>
        </div>
      </div>

      <div className={`${styles.fadeTransition} ${isExiting ? styles.showContent : styles.hideContent}`}>
        {children}
      </div>
    </>
  );
};

Loader.propTypes = {
  children: PropTypes.node.isRequired,
  isExiting: PropTypes.bool.isRequired,
  setIsExiting: PropTypes.func.isRequired,
};

export default Loader;
