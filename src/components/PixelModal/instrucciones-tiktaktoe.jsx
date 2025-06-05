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
          <h1>¡Bienvenido a X0!</h1>
          <h2>¿Cómo jugar?</h2>
          <div className="Alineado-Izquierda">
            <p>1. Selecciona la dificultad:</p>

            <ul>
              <li><span className="facil">* Fácil: +1 UsoCoin</span></li>
              <li><span className="medio">* Medio: +2 UsoCoins</span></li>
              <li><span className="dificil">* Difícil: +3 UsoCoins</span></li>
            </ul>

            <p>2. Se te asignará un símbolo aleatoriamente ❌ o ⭕.</p>
            <p>3. Si ganas o empatas puedes usar el botón "Siguiente ronda".</p>
            <p>4. ¡Si ganas las 5 rondas reclama tus UsoCoins!</p>
            <p>5. ¡Intenta conseguir la mayor cantidad de Usocoins posibles!</p>
          </div>
          <button type="button" onClick={handleClose}>¡Entendido!</button>
        </div>
      </PixelFrame>
    </div>
  );
});

export default InstruccionesModal;
