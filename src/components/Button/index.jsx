import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ className = styles.Button, type = "button", onClick, disabled = false, text, image, alt }) => {
  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {image && <img src={image} alt={alt} className={styles.buttonImage} />}
      <span>{text}</span>
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  image: PropTypes.string,
  alt: PropTypes.string,
};

export default Button;
