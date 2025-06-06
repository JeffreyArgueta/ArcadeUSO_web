import React, { useState, useCallback } from "react";
import Pixelmodal from "./pixel-modal";
import "./instrucciones-modal.css";

const InstruccionesModal = React.memo(({ onClose }) => {
    const [closing, setClosing] = useState(false);

    const handleClose = useCallback(() => {
        setClosing(true);
        setTimeout(onClose, 300); // Espera 300ms para que la animación de cierre termine
    }, [onClose]);

    return (
        <div className={`instrucciones-modal ${closing ? "salir" : ""}`}>
            <Pixelmodal>
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
            </Pixelmodal>
        </div>
    );
});

export default InstruccionesModal;