import PropTypes from "prop-types";
import styles from "./CloseButton.module.css";

const CloseButton = ({ onClose, disabled }) => {
  return <button className={styles.closeButton} type="button" onClick={onClose} disabled={disabled}> X </button>;
};

CloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default CloseButton;
