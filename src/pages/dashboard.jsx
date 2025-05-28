// src/pages/dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      console.error("❌ Token inválido:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="dashboard">
      <h1>🎮 Bienvenido a ArcadeUSO, {user.username}!</h1>
      <p>Tu correo: {user.email}</p>
      <p>Tu ID: {user.id_user}</p>
      <p>Rol: {user.role}</p>
      <p>Authentication_method: {user.authentication_method}</p>
      <p>uso_coins: {user.uso_coins}</p>
      <p>daro_points: {user.daro_points}</p>
      <p>created_at: {user.created_at}</p>
      <p>updated_at: {user.updated_at}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
