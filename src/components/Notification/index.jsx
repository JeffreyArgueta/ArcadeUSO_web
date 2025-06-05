import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styles from "./Notification.module.css";

const Notification = ({ message, type = "Success", onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Espera la animación antes de cerrar
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.notification} ${styles[type]} ${!isVisible ? styles.hidden : ""}`}>
      <p>{message}</p>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
