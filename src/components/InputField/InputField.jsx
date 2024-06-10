import { forwardRef, useId } from 'react';
import propTypes from 'prop-types';
import styles from './InputField.module.scss';

const InputField = forwardRef((props, ref) => {
  const inputId = useId();
  const { label, ...inputProps } = props;

  return (
    <div className={styles.inputField}>
      <label htmlFor={inputId}>{label}</label>
      <input {...inputProps} id={inputId} ref={ref} />
    </div>
  );
});

InputField.propTypes = {
  label: propTypes.string,
};

InputField.displayName = 'InputField'; // Add display name

export default InputField;