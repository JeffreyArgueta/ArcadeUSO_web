import PropTypes from "prop-types";
import userIcon from '@/assets/user.png';
import daroIcon from '@/assets/daro_points.png';
import usoIcon from '@/assets/uso_coins.png';
import shutdownIcon from '@/assets/shutdown.png';
import "./statusBar.css";

const Statusbar = ({ user, onLogout }) => {
  return (
    <div className="status-bar">
      <div className="status-user">
        <div className="status-item">
          <img src={userIcon} alt="Usuario" className="status-icon" />
          <span>{user.username}</span>
        </div>
      </div>
      <div className="status-points">
        <div className="status-item">
          <img src={daroIcon} alt="Puntos" className="status-icon" />
          <span className="daro_points">{user.daro_points}</span>
        </div>
        <div className="status-item">
          <img src={usoIcon} alt="Monedas" className="status-icon" />
          <span className="uso_coins">{user.uso_coins}</span>
        </div>
        <div className="logout-item" onClick={onLogout}>
          <img src={shutdownIcon} alt="Cerrar Sesión" className="logout-icon" />
          {/* <div className="logout-span"> */}
          {/*   <span>Cerrar</span> */}
          {/*   <span>Sesión</span> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

Statusbar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    daro_points: PropTypes.number.isRequired,
    uso_coins: PropTypes.number.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Statusbar;
