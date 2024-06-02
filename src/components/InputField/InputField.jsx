import propTypes from 'prop-types';
import { useId } from "react"
import styles from './InputField.module.scss';

const InputField = (props) => {
  const inputId = useId()
  const { label, ...inputProps } = props;

  return (
    <div className={styles.inputField}>
      <label htmlFor={inputId}>{label}</label>
      <input {...inputProps} id={inputId} />
    </div>
  )
}

InputField.propTypes = {
  label: propTypes.string
}

export default InputField;