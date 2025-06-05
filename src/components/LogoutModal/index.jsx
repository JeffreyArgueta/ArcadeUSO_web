import PropTypes from "prop-types";
import styles from "./LogoutModal.module.css";

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.logoutModal}>
      <h1>¿Estás seguro?</h1>
      <p>Perderás cualquier progreso no guardado. ¿Deseas continuar?</p>
      <div className={styles.modalActions}>
        <button className={styles.cancelButton} onClick={onCancel}>Cancelar</button>
        <button className={styles.confirmButton} onClick={onConfirm}>Cerrar sesión</button>
      </div>
    </div>
  );
};

LogoutModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default LogoutModal;
