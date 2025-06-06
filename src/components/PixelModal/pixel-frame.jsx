import esquinaAI from "@/assets/corners/upper_left.png";
import esquinaAD from "@/assets/corners/upper_right.png";
import esquinaBI from "@/assets/corners/bottom_left.png";
import esquinaBD from "@/assets/corners/bottom_right.png";

import bordeA from "@/assets/borders/up.png";
import bordeB from "@/assets/borders/down.png";
import bordeI from "@/assets/borders/left.png";
import bordeD from "@/assets/borders/right.png";

import fondo from "@/assets/fill.png";

import "./pixel-frame.css";

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

