import { useState, useEffect } from 'react';
import '@/components/pantallaCarga/pantalla-carga.css';
import notaMusical from '../../assets/music_note.gif';

const PantallaCarga = ({ children }) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [showReadyMessage, setShowReadyMessage] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Solo cargamos los assets necesarios para Buscaminas
    const imageAssets = [
      notaMusical
    ];

    const loadAssets = async () => {
      try {
        await Promise.all(imageAssets.map(src => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          });
        }));

        setAssetsLoaded(true);
        setTimeout(() => {
          setShowReadyMessage(true);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => setShouldRender(false), 500);
          }, 2000);
        }, 2000);
      } catch (error) {
        setAssetsLoaded(true);
        setShowReadyMessage(true);
        setIsExiting(true);
        setTimeout(() => setShouldRender(false), 500);
      }
    };

    loadAssets();
  }, []);

  if (!shouldRender) {
    return children;
  }

  return (
    <>
      <div className={`pantalla-carga ${isExiting ? 'salir' : 'entrar'}`}>
        <div className="pantalla-carga-contenido">
          <img src={notaMusical} alt="Cargando..." className="cargando-gif" />
          <p className={`cargando-texto ${showReadyMessage ? 'todo-listo' : ''}`}>
            {showReadyMessage ? "¡Todo listo, buena suerte!" : "Cargando..."}
          </p>
        </div>
      </div>
      {/* Renderiza los hijos detrás con opacidad controlada */}
      <div style={{
        opacity: isExiting ? 1 : 0,
        transition: 'opacity 1s ease',
        position: 'fixed',
        width: '100%',
        height: '100%'
      }}>
        {children}
      </div>
    </>
  );
};

export default PantallaCarga;