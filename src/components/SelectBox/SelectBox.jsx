import propTypes from 'prop-types';
import styles from './SelectBox.module.scss';

const SelectBox = ({options, value, onChange, label}) => {
  return (
    <div className={styles.selectBoxField}>
      <label>{label}</label>
      <div className={styles.selectBox}>
        <select value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  ) 
}

SelectBox.propTypes = {
  options: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string,
      value: propTypes.string
    })
  ),
  value: propTypes.string,
  onChange: propTypes.func,
  label: propTypes.string,
}

export default SelectBox;