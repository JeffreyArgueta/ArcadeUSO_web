import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getTopLeaderboard } from "@/services/api";
import CloseButton from "@/components/CloseButton";
import points from "@/assets/daro_points.png";
import styles from "./LeaderboardModal.module.css";

const LeaderboardModal = ({ onClose }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getTopLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error("❌ Error cargando leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className={styles.leaderboardModal}>
      <CloseButton onClose={onClose} />
      <h2 className={styles.title}>TOP 10</h2>

      <div className={styles.tableContainer}>
        <table className={styles.leaderboardTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Jugador</th>
              <th>
                <img src={points} alt="DaroPoints" className={styles.icon} />
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={user.id_user} className={index < 3 ? styles.top3 : styles.regular}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.daro_points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

LeaderboardModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LeaderboardModal;
