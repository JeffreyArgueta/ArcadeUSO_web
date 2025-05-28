import PropTypes from 'prop-types';
import googleIcon from '@/assets/google.png';
import './googleButton.css';

const GoogleButton = ({ onClick, text, disabled }) => {
  return (
    <button className="google-button" onClick={onClick} disabled={disabled}>
      <img src={googleIcon} alt="Google Logo" className="google-icon" />
      {text}
    </button>
  );
};

GoogleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  isLoged: PropTypes.bool,
};

export default GoogleButton;
