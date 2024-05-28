import propTypes from 'prop-types';
import styles from './Button.module.scss';
import clsx from 'clsx';

const Button = ({ label, type = 'button', onClick, variant}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(styles.button, styles[variant])}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: propTypes.node,
  type: propTypes.string,
  variant: propTypes.string,
  onClick: propTypes.func,
}

export default Button;