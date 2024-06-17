import { useState, useEffect } from 'react';
import styles from './Loading.module.scss';
import PropTypes from 'prop-types';

export default function Loading({isLoading}) {
  const [display, setDisplay] = useState(false);
  const minDisplayTime = 300; 

  useEffect(() => {
    let timer;

    if(isLoading) {
      // 로딩 시작 시 바로 표시
      setDisplay(true);
    } else if (display) {
      // 로딩이 끝났고, 컴포넌트가 표시 중이라면 최소 표시 시간을 보장
      const startTime = Date.now();
      const elapsedTime = Date.now() - startTime;
      const remainingTime = minDisplayTime - elapsedTime;

      timer = setTimeout(() => {
        setDisplay(false);
      }, remainingTime > 0 ? remainingTime : 0); // 남은 시간이 있으면 기다리고, 없으면 바로 종료
    }

    return () => clearTimeout(timer)
  }, [isLoading]);

  return (
    <>
      {display ?
        <p className={styles.loading}>LOADING...</p>
        : null
      }
    </>

  );
}


Loading.propTypes = {
  isLoading: PropTypes.bool,
}