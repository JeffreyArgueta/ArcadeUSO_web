import PropTypes from "prop-types";
import { useState } from "react";
import passwordOn from "@/assets/password_on.png";
import passwordOff from "@/assets/password_off.png";
import styles from "./InputPassword.module.css";

const InputPassword = ({ label, name, value, autoComplete, onChange, required = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = (visible) => {
    const input = document.getElementById(name);
    const cursorPosition = input.selectionStart; // Guarda la posición del cursor

    setIsVisible(visible);

    setTimeout(() => {
      input.focus();
      input.selectionStart = cursorPosition;
      input.selectionEnd = cursorPosition; // Restaura la posición del cursor
    }, 0);
  };

  return (
    <div className={styles.inputPassword}>
      <label htmlFor={name}> {label} </label>
      <div className={styles.inputToggle}>
        <input
          id={name}
          type={isVisible ? "text" : "password"}
          name={name}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          required={required}
        />
        <button
          className={styles.toggleButton}
          type="button"
          onMouseDown={() => handleVisibility(true)}
          onMouseUp={() => handleVisibility(false)}
          onMouseLeave={() => handleVisibility(false)}
        >
          <img src={isVisible ? passwordOn : passwordOff} alt="Mostrar contraseña" />
        </button>
      </div>
    </div>
  );
};

InputPassword.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default InputPassword;
