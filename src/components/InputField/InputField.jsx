import propTypes from 'prop-types';
import styles from './InputField.module.scss';

const InputField = ({ label, type = 'text', name, onChange, placeholder }) => (
  <div className={styles.inputField}>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

InputField.propTypes = {
  label: propTypes.string,
  type: propTypes.string,
  name: propTypes.string,
  onChange: propTypes.func,
  placeholder: propTypes.string,
}

export default InputField;