import PropTypes from "prop-types";
import styles from "./Separator.module.css";

const Separator = ({ text }) => {
  return (
    <div className={styles.Separator}>
      <span>{text}</span>
    </div>
  );
};

Separator.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Separator;
