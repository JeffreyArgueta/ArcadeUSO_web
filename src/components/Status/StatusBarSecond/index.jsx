import PropTypes from "prop-types";
import { useSound } from "@/context/soundContext";
import StatusItem from "../StatusItem";
import VolumeControl from "@/components/VolumeControl";
import styles from "./StatusBarSecond.module.css";
import leaderboardIcon from "@/assets/leaderboard.png";

const StatusBarSecond = ({ selectedGame, setSelectedGame, setShowLeaderboard }) => {
  const { sounds } = useSound();
  const { button } = sounds;


  const handleClickLeaderboard = () => {
    button.play();
    setShowLeaderboard(true);
  }

  return (
    <div className={styles.statusBarSecond}>
      <div>
        <StatusItem>
          <VolumeControl className={styles.statusIcon} />
        </StatusItem>
      </div>
      <div className={styles.options}>
        <button className={styles.return}
          onClick={() => setSelectedGame(null)}
          hidden={selectedGame === null}
          type="button">Regresar
        </button>
        <StatusItem icon={leaderboardIcon} onClick={handleClickLeaderboard} alt="Ver Puntuaciones" />
      </div>
    </div>
  );
};

StatusItem.propTypes = {
  icon: PropTypes.string,
  alt: PropTypes.string,
  children: PropTypes.node,
};

export default StatusBarSecond;
