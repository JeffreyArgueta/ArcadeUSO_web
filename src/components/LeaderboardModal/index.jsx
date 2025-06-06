import PropTypes from "prop-types";
import { useCallback } from "react";
import { useSound } from "@/context/soundContext";
import CloseButton from "@/components/CloseButton";
import styles from "./LeaderboardModal.module.css";

const LeaderboardModal = ({ onConfirm, onCancel }) => {
  const { sounds } = useSound();
  const { logout } = sounds;

  const handleConfirm = useCallback(() => {
    logout.play();
    setTimeout(onConfirm, 250);
  }, [onConfirm]);

  return (
    <div className={styles.leaderboardModal}>
      <CloseButton onClose={onClose} disabled={disabled} />
      {/* <h1>¿Estás seguro?</h1> */}
      {/* <p>Perderás cualquier progreso no guardado. ¿Deseas continuar?</p> */}
      {/* <div className={styles.modalActions}> */}
      {/*   <button className={styles.cancelButton} onClick={onCancel}>Cancelar</button> */}
      {/*   <button className={styles.confirmButton} onClick={handleConfirm}>Cerrar sesión</button> */}
      {/* </div> */}
    </div>
  );
};

LeaderboardModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default LeaderboardModal;
