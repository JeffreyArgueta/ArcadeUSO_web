import "./pixel-modal.css";

// Importación de imágenes
import esquinaAI from "../../assets/esquinas/Arriba Izquierda.png";
import esquinaAD from "../../assets/esquinas/Arriba Derecha.png";
import esquinaBI from "../../assets/esquinas/Abajo Izquierda.png";
import esquinaBD from "../../assets/esquinas/Abajo Derecha.png";

import bordeA from "../../assets/bordes/Arriba.png";
import bordeB from "../../assets/bordes/Abajo.png";
import bordeI from "../../assets/bordes/Izquierda.png";
import bordeD from "../../assets/bordes/Derecha.png";

import fondo from "../../assets/Relleno.png";

const PixelFrame = ({ children }) => {
  return (
         <div className="pixel-frame">
      <div className="esquina arriba-izquierda" style={{ backgroundImage: `url(${esquinaAI})` }} />
      <div className="borde arriba" style={{ backgroundImage: `url(${bordeA})` }} />
      <div className="esquina arriba-derecha" style={{ backgroundImage: `url(${esquinaAD})` }} />

      <div className="borde izquierda" style={{ backgroundImage: `url(${bordeI})` }} />
      <div className="centro" style={{ backgroundImage: `url(${fondo})` }}>
        {children}
      </div>
      <div className="borde derecha" style={{ backgroundImage: `url(${bordeD})` }} />

      <div className="esquina abajo-izquierda" style={{ backgroundImage: `url(${esquinaBI})` }} />
      <div className="borde abajo" style={{ backgroundImage: `url(${bordeB})` }} />
      <div className="esquina abajo-derecha" style={{ backgroundImage: `url(${esquinaBD})` }} />
    </div>
        
  );
};

export default PixelFrame;

