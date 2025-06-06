import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

// Loader
import musicNote from "@/assets/music_note.gif";

// Statusbar
import user from "@/assets/user.png";
import coins from "@/assets/uso_coins.png";
import points from "@/assets/daro_points.png";
import shutdown from "@/assets/shutdown.png";
import leaderboard from "@/assets/leaderboard.png";

// UI - Elements
import soundOn from "@/assets/sound_on.png";
import soundOff from "@/assets/sound_off.png";
import tarjeta from "@/assets/tarjeta.png";

// Login
import background01 from "@/assets/background.gif";
import background02 from "@/assets/background2.gif";
import background03 from "@/assets/background3.png";
import passwordOn from "@/assets/password_on.png";
import passwordOff from "@/assets/password_off.png";
import google from "@/assets/google.png";

// PixelFrame - Corners
import cornerUL from "@/assets/corners/upper_left.png";
import cornerUR from "@/assets/corners/upper_right.png";
import cornerBL from "@/assets/corners/bottom_left.png";
import cornerBR from "@/assets/corners/bottom_right.png";

// PixelFrame - Borders
import borderU from "@/assets/borders/up.png";
import borderD from "@/assets/borders/down.png";
import borderL from "@/assets/borders/left.png";
import borderR from "@/assets/borders/right.png";

// PixelFrame - Fill
import fill from "@/assets/fill.png";

// Gachapon
import clouds from "@/assets/gachapon/Nubes.gif";
import common from "@/assets/gachapon/Comun.gif";
import epic from "@/assets/gachapon/Epico.gif";
import legendary from "@/assets/gachapon/Legendario.gif";
import insertCoin from "@/assets/gachapon/Inserte Moneda.gif";
import coinInserted from "@/assets/gachapon/Moneda In.gif";

// Minesweeper
import bomb from "@/assets/buscaminas/bomba.png";
import box from "@/assets/buscaminas/box.png";
import animatedBomb from "@/assets/buscaminas/Bomba.gif"

import styles from "./Loader.module.css";

const imageAssets = [
  musicNote,
  user,
  coins,
  points,
  shutdown,
  leaderboard,
  soundOn,
  soundOff,
  tarjeta,
  background01,
  background02,
  background03,
  passwordOn,
  passwordOff,
  google,
  cornerUL,
  cornerUR,
  cornerBL,
  cornerBR,
  borderU,
  borderD,
  borderL,
  borderR,
  fill,
  clouds,
  common,
  epic,
  legendary,
  insertCoin,
  coinInserted,
  bomb,
  box,
  animatedBomb
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
