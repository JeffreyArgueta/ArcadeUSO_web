import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Howl, Howler } from "howler";

const SoundContext = createContext(null);

const sounds = {
  click: new Howl({ src: ["/sounds/click.mp3"], volume: 0.5 }),
  logout: new Howl({ src: ["/sounds/logout.mp3"], volume: 1 }),
  background: new Howl({ src: ["/sounds/8-bit-loop-189494.mp3"], volume: 0.3, loop: true }),
  button: new Howl({ src: ["/sounds/button.mp3"], volume: 1 }),
  playGame: new Howl({ src: ["/sounds/selectionGame.mp3"], volume: 1 }),
  coin: new Howl({ src: ["/sounds/coin-insert.wav"], volume: 0.5, delay: 650 }),
  volumeAlert: new Howl({ src: ["/sounds/volume-alert.mp3"], volume: 1 }),
  comun: new Howl(
    { src: ["/sounds/explosion-ballon.wav"], volume: 0.5, delay: 1800 },
    { src: ["/sounds/explosion-ballon.wav"], volume: 0.5, delay: 2250 },
    { src: ["/sounds/explosion-4.wav"], volume: 0.5, delay: 2950 },
    { src: ["/sounds/score.mp3"], volume: 0.6, delay: 3200 },
  ),
  epico: new Howl(
    { src: ["/sounds/explosion-ballon.wav"], volume: 0.5, delay: 1800 },
    { src: ["/sounds/explosion-ballon.wav"], volume: 0.5, delay: 2250 },
    { src: ["/sounds/explosion-4.wav"], volume: 0.5, delay: 2950 },
    { src: ["/sounds/score.mp3"], volume: 0.6, delay: 3600 },
  ),
  legendario: new Howl(
    { src: ["/sounds/advertencia.mp3"], volume: 0.3 },
    { src: ["/sounds/fallagachapon.mp3"], volume: 0.6, delay: 2900, endtime: 3 },
    { src: ["/sounds/explosion-2.mp3"], volume: 0.9, delay: 5500 },
    { src: ["/sounds/explosion-4.wav"], volume: 0.4, delay: 5700 },
    { src: ["/sounds/meteorito-2.wav"], volume: 0.4, delay: 6000 },
    { src: ["/sounds/explosion-3.mp3"], volume: 0.7, delay: 9500 },
    { src: ["/sounds/legendario-texto.mp3"], volume: 0.9, delay: 10000, loop: true },
  ),
};

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const listeners = new Set();

  const unlockAudio = useCallback(() => {
    if (Howler?.ctx?.state === "suspended") {
      Howler.ctx.resume().catch((err) => console.error("Error al reactivar audio:", err));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, [unlockAudio]);

  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    Howler.mute(newState); // Aplica mute globalmente a todos los sonidos
    listeners.forEach(listener => listener(newState)); // Notifica cambios
  };

  const addListener = (listener) => listeners.add(listener);
  const removeListener = (listener) => listeners.delete(listener);

  return (
    <SoundContext.Provider value={{ sounds, isMuted, toggleMute, addListener, removeListener }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
