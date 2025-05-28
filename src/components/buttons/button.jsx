import PropTypes from "prop-types";
import "./button.css";

const Button = ({ className='button', text, onClick, type = "button", disabled = false }) => {
  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
