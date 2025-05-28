import PropTypes from "prop-types";
import CloseButton from "@/components/buttons/closeButton";
import "./modal.css"; // Archivo de estilos

const Modal = ({ onClose, disabled, title, children }) => {
  return (
    <div className='modal'>
      <CloseButton onClose={onClose} disabled={disabled} />
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
