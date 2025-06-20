import PropTypes from "prop-types";
import StatusBar from "./StatusBar";
import StatusBarSecond from "./StatusBarSecond";
import styles from "./Status.module.css"

const Status = ({ user, selectedGame, setSelectedGame, setShowLeaderboard, onLogout }) => {

  return (
    <div className={styles.statusContainer}>
      <StatusBar user={user} onLogout={onLogout} />
      <StatusBarSecond selectedGame={selectedGame} setSelectedGame={setSelectedGame} setShowLeaderboard={setShowLeaderboard} />
    </div>
  );
};

Status.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    daro_points: PropTypes.number.isRequired,
    uso_coins: PropTypes.number.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Status;
