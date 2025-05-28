import PropTypes from "prop-types";
import Button from "./button";
import "./closeButton.css";

const CloseButton = ({ onClose, disabled }) => {
  return (
    <Button className='closeButton' text="X" type="button" onClick={onClose} disabled={disabled} />
  );
};

CloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CloseButton;
