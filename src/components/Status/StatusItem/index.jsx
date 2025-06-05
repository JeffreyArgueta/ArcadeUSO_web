import PropTypes from "prop-types";
import styles from "./StatusItem.module.css";

const StatusItem = ({ icon, text, className, onClick, children }) => (
  <div className={`${styles.statusItem} ${className}`} onClick={onClick}>
    {icon && <img src={icon} alt="status icon" className={styles.statusIcon} />}
    {text && <span>{text}</span>}
    {children}
  </div>
);

StatusItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default StatusItem;
