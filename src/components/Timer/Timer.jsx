import ClockIcon from '@/assets/icons/ClockIcon';
import styles from './Timer.module.scss';
import propTypes from 'prop-types';

const Timer = ({ timeLeft, isRunning }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={styles.timer}>
      <ClockIcon stroke="#AAAAAA" />
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

Timer.propTypes = {
  isRunning: propTypes.bool,
  timeLeft: propTypes.number,
};

export default Timer;