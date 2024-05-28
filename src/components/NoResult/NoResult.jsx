import styles from './NoResult.module.scss';
import propTypes from 'prop-types';
import Button from '@/components/Button/Button';


const NoResult = ({icon, message, buttonShow, actionFn, buttonText}) => {
  return (
    <div className={styles.noResult}>
      <div className={styles.iconBox}>
        {icon}
      </div>
      <p className={styles.messageText}>{message}</p>
      {buttonShow && <Button
        type={"button"}
        onClick={actionFn} 
        label={buttonText}
        variant={"active"}
      />}
    </div>
  )
}

NoResult.propTypes = {
  icon: propTypes.element,
  message: propTypes.string,
  buttonShow: propTypes.bool,
  actionFn: propTypes.func,
  buttonText: propTypes.string
}

export default NoResult;