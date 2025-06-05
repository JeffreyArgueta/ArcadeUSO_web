import React, { useState, useCallback } from "react";
import PixelFrame from "./pixel-frame.jsx";
import { useSound } from "@/context/soundContext";
import "./instrucciones-gachapon.css";

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
          <h1>¡Bienvenido a Buscaminas!</h1>
          <h2>¿Como jugar?</h2>
          <div className="Alineado-Izquierda">
            <p>1. Haz clic en una celda para descubrirla.</p>
            <p>2. Si encuentras una bomba 💣, pierdes la partida.</p>
            <p>3. Si encuentras 5 usocoins, ganas 1 usocoin global.</p>
            <p>4. Usa el botón "Reiniciar" para empezar de nuevo.</p>
            <p>5. ¡Intenta conseguir la mayor cantidad de Usocoins posibles!</p>
          </div>
          <button type="button" onClick={handleClose}>¡Entendido!</button>
        </div>
      </PixelFrame>
    </div>
  );
});

export default InstruccionesModal;
