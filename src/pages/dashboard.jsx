import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

import usuarioImg from "../assets/usuario.png";
import usoCoinImg from "../assets/usocoins.png";
import daroCoinImg from "../assets/daropoints.png";

import game1Img from "../assets/x0.png";
import game2Img from "../assets/prueba.png";

import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      console.error("Token inválido", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <p className="loading">Cargando...</p>;

  const games = [
    { img: game1Img, name: "Cat Bros" },
    { img: game1Img, name: "Cat Bros" },
    { img: game1Img, name: "Cat Bros" },
    { img: game1Img, name: "Cat Bros" },
    { img: game2Img, name: "prueba" },
  ];

  return (
    <div className="arcade-dashboard">
      <header className="top-bar">
        <div className="info-block">
          <img src={usuarioImg} alt="usuario" />
          <span>{user.username}</span>
        </div>
        <div className="info-block">
          <img src={usoCoinImg} alt="UsoCoins" />
          <span>{user.uso_coins}</span>
        </div>
        <div className="info-block">
          <img src={daroCoinImg} alt="DaroPoints" />
          <span>{user.daro_points}</span>
        </div>
      </header>

      <main className="games-area">
        {games.map((game, i) => (
          <div key={i} className="game-card">
            <img src={game.img} alt={game.name} />
            <span className="game-title">{game.name}</span>
          </div>
        ))}
      </main>

      <button className="logout-button" onClick={handleLogout}>
        ⏹️ Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;
