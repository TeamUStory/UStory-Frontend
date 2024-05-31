import PropTypes from 'prop-types';
import styles from './RadioButton.module.scss';

const RadioButton = ({ checked, onChange }) => {
  return (
    <label className={styles.radioButton}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.radioButton__input}
      />
      <span className={styles.radioButton__custom}></span>
    </label>
  );
};

RadioButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RadioButton;