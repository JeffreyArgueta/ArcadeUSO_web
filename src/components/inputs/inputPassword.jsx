import PropTypes from 'prop-types';
import { useState } from 'react';
import passwordOn from '@/assets/password_on.png'
import passwordOff from '@/assets/password_off.png'
import './inputPassword.css'


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
    <div className="input-password">
      <label htmlFor={name}> {label} </label>
      <div className="input-toggle">
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
          className="toggle-button"
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
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  autocomplete: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default InputPassword;
