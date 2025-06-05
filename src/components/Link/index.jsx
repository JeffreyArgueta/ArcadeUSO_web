import PropTypes from "prop-types";
import styles from "./Link.module.css";

const Link = ({ className=styles.Link, text, href, texthref, disabled }) => {
  return (
    <p className={className}>
      {text}
      <span onClick={href} className={disabled ? styles.disabledLink : ""}>{texthref}</span>
    </p>
  );
};

Link.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  href: PropTypes.func.isRequired,
  texthref: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Link;
