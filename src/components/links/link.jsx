import './link.css';

const Link = ({ className = 'link', text, href, texthref, disabled }) => {
  return (
    <p className={className}>
      {text}
      <a href={href} className={disabled ? 'disabled-link' : ''}>{texthref}</a>
    </p>
  );
};

export default Link;
