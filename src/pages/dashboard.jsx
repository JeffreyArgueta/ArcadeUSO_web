import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "@/services/api"
import LogoutModal from "@/components/LogoutModal";
import LeaderboardModal from "@/components/LeaderboardModal";
import NicknameForm from "@/components/Nickname";
import Status from "@/components/Status";
import Content from "@/components/Content";
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isNicknameUpdated, setIsNicknameUpdated] = useState(false);
  const [container, setContainer] = useState("nickname");

  const handleLogoutClick = () => setShowConfirm(true);
  const handleCancel = () => setShowConfirm(false);
  const handleConfirmLogout = () => {
    setShowConfirm(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleClose = () => setShowLeaderboard(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // 🔥 Nueva llamada a la API para obtener datos reales del usuario
      const fetchUser = async () => {
        try {
          const updatedUser = await getUserById(decoded.id_user);
          if (updatedUser) {
            setUser(updatedUser); // 🔥 Ahora usamos la versión actualizada del usuario
          }
        } catch (error) {
          console.error("❌ Error obteniendo datos del usuario:", error);
          localStorage.removeItem("token");
          navigate("/");
        }
      };

      fetchUser();

    } catch (error) {
      console.error("❌ Token inválido:", error);
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (user && !isNicknameUpdated) {
      setContainer(user.authentication_method === "google" && user.created_at === user.updated_at ? "nickname" : "dashboard");
    }
  }, [user, isNicknameUpdated]);

  if (!user) return <p>Cargando...</p>;

  return (
    <div className={styles.Overlay}>

      {showConfirm && (
        <div className={styles.logoutOverlay}>
          <LogoutModal onConfirm={handleConfirmLogout} onCancel={handleCancel} />
        </div>
      )}

      {showLeaderboard && (
        <div className={styles.logoutOverlay}>
          <LeaderboardModal onClose={handleClose} />
        </div>
      )}

      {container === "nickname" ? (
        <NicknameForm
          user={user}
          setUser={setUser}
          isNicknameUpdated={isNicknameUpdated}
          setIsNicknameUpdated={setIsNicknameUpdated}
          switchToDashboard={() => setContainer("dashboard")}
        />
      ) : (
        <>
          <div className={styles.Container}>
            <Status
                user={user}
                selectedGame={selectedGame}
                setSelectedGame={setSelectedGame}
                setShowLeaderboard={setShowLeaderboard}
                onLogout={handleLogoutClick}
            />
            <Content
              user={user}
              setUser={setUser}
              selectedGame={selectedGame}
              setSelectedGame={setSelectedGame}
            />
          </div>

        </>
      )}

    </div>
    //   <p>Tu correo: {user.email}</p>
    //   <p>Tu ID: {user.id_user}</p>
    //   <p>Rol: {user.role}</p>
    //   <p>Authentication_method: {user.authentication_method}</p>
    //   <p>uso_coins: {user.uso_coins}</p>
    //   <p>daro_points: {user.daro_points}</p>
    //   <p>created_at: {user.created_at}</p>
    //   <p>updated_at: {user.updated_at}</p>
  );
};

export default Dashboard;
