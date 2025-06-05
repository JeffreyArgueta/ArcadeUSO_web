import PropTypes from "prop-types";
import { useEffect } from "react";
import CloseButton from "@/components/CloseButton";
import styles from "./Modal.module.css";

const Modal = ({ title, children, disabled, onClose, }) => {

  useEffect(() => {
    console.log("Modal montado");
  }, []);

  return (
    <div className={styles.Modal}>
      <CloseButton onClose={onClose} disabled={disabled} />
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
