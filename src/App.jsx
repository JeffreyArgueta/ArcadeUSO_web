import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import AppRoutes from "@/routes";

function App() {
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true); // 🔄 Activar animación de salida
      const loadingTimer = setTimeout(() => setLoading(false), 500); // 🔥 Esconder Loader después de animación
      return () => clearTimeout(loadingTimer);
    }, 2000);

    return () => clearTimeout(exitTimer); // ✅ Limpieza al desmontar el componente
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Backspace" && !event.target.matches("input, textarea")) {
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    loading ? <Loader isExiting={isExiting} setIsExiting={setIsExiting} /> : <AppRoutes />
  );
}

export default App;
