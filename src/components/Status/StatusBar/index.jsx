import PropTypes from "prop-types";
import { useSound } from "@/context/soundContext";
import StatusItem from "../StatusItem";
import userIcon from "@/assets/user.png";
import daroIcon from "@/assets/daro_points.png";
import usoIcon from "@/assets/uso_coins.png";
import shutdownIcon from "@/assets/shutdown.png";
import styles from "./StatusBar.module.css";

const StatusBar = ({ user, onLogout }) => {
  const { sounds } = useSound();
  const { button } = sounds;

  const handleClickUser = () => {
    button.play();
  }

  const handleClickLogout = () => {
    button.play();
    onLogout();
  }

  return (
    <div className={styles.statusBar}>
      <div className={styles.statusUser}>
        <StatusItem icon={userIcon} text={user.username} onClick={handleClickUser} />
      </div>
      <div className={styles.statusPoints}>
        <StatusItem icon={daroIcon} text={user.daro_points} className={styles.daroPoints} />
        <StatusItem icon={usoIcon} text={user.uso_coins} className={styles.usoCoins} />
        <StatusItem icon={shutdownIcon} onClick={handleClickLogout} />
      </div>
    </div>
  );
};

StatusBar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    daro_points: PropTypes.number.isRequired,
    uso_coins: PropTypes.number.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default StatusBar;
