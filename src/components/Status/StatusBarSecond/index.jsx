import PropTypes from "prop-types";
import StatusItem from "../StatusItem";
import VolumeControl from "@/components/VolumeControl";
import styles from "./StatusBarSecond.module.css";
import leaderboardIcon from "@/assets/leaderboard.png";

const StatusBarSecond = () => {
  return (
    <div className={styles.statusBarSecond}>
      <div>
        <StatusItem>
          <VolumeControl className={styles.statusIcon} />
        </StatusItem>
      </div>
      <div>
        <StatusItem icon={leaderboardIcon} alt="Ver Puntuaciones" />
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
