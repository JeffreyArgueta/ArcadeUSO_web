import React, { useState, useCallback } from "react";
import PixelFrame from "./pixel-frame.jsx";
import { useSound } from "@/context/soundContext";
import "./instrucciones.css";

const InstruccionesModal = React.memo(({ onClose }) => {
  const { sounds } = useSound();
  const { click } = sounds;
  const [closing, setClosing] = useState(false);
  const [entering, setEntering] = useState(true); 

  const handleClose = useCallback(() => {
    click.play();
    setClosing(true);
    setTimeout(onClose, 300); // Espera 300ms para que la animación de cierre termine
  }, [onClose]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setEntering(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`instrucciones-modal ${entering ? "entrar" : ""} ${closing ? "salir" : ""}`}>
      <PixelFrame>
        <div className="instrucciones-contenido">
          <h1>¡Bienvenido al gachapón!</h1>
          <h2>¿Cómo jugar?</h2>
          <div className="Alineado-Izquierda">
            <p>1. Haz clic en "Usar USO Coins" para jugar</p>
            <p>2. Cada tirada cuesta 1 USO Coin</p>
            <p>3. Puedes ganar diferentes objetos: </p>
          </div>
          <ul>
            <li><span className="comun">* Comunes</span></li>
            <li><span className="epico">* Épicos</span></li>
            <li><span className="legendario">* Legendarios</span></li>
          </ul>
          <div className="Alineado-Izquierda">
            <p>4. Los objetos dan Daro Points diferentes</p>
            <p>5. ¡Usa tu suerte para tener el mayor puntaje!</p>
          </div>
          <button type="button" onClick={handleClose}>¡Entendido!</button>
        </div>
      </PixelFrame>
    </div>
  );
});

export default InstruccionesModal;
