import PropTypes from 'prop-types';
import styles from './RadioButton.module.scss';

const RadioButton = ({ checked, onChange, disabled }) => {
  return (
    <label className={`${styles.radioButton} ${disabled ? styles.disabled : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.radioButton__input}
        disabled={disabled}
      />
      <span className={styles.radioButton__custom}></span>
    </label>
  );
};

RadioButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default RadioButton;
