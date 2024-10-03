import PropTypes from 'prop-types';
import './Checkbox.css';

const Checkbox = ({ checked = false, onChange, className }) => {
  return <input checked={checked} className={className} onChange={onChange} type="checkbox" />;
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
};

export default Checkbox;
