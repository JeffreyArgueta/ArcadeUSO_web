import PropTypes from 'prop-types';
import "./inputField.css";

const InputField = ({ label, type, name, autocomplete, value, onChange, required = false, placeholder="" }) => {
  return (
    <div className="input-field">
      <label htmlFor={name}> {label} </label>
      <input
        id={name}
        type={type}
        name={name}
        autoComplete={autocomplete}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  autocomplete: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default InputField;
