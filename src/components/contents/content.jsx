import PropTypes from "prop-types";
import "./content.css";

const Content = ({ children }) => {
  return <div className="content">{children}</div>;
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
