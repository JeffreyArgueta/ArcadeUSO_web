import React, { useState } from "react";
import "./modal.css";

const BuscaminasModal = ({ title = "¡Atención!", message, onClose, buttonText = "Cerrar" }) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300); // Da tiempo a la animación de salida
  };

  return (
    <div className={`buscaminas-modal ${closing ? "salir" : "entrar"}`}>
      <div className="modal-frame">
        <div className="modal-content">
          <h2 className="modal-title">{title}</h2>
          <p className="modal-message">{message}</p>
          <button className="modal-close-btn" onClick={handleClose}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuscaminasModal;