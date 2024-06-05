import React, { createContext, useState, useRef } from 'react';
import propTypes from 'prop-types';
import styles from './Carousel.module.scss';

const CarouselContext = createContext();

export const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // 초기 currentIndex를 0으로 설정합니다.
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  const handleTouchStart = (e) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartRef.current !== null) {
      touchEndRef.current = e.changedTouches[0].clientX;
      handleSwipe();
    }
  };

  const handleSwipe = () => {
    const diff = touchStartRef.current - touchEndRef.current;
    if (diff > 0) {
      handleNext();
    } else if (diff < 0) {
      handlePrevious();
    }
  };

  const handlePrevious = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex === Math.ceil(React.Children.count(children) / 3) - 1) {
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  console.log(currentIndex);
  return (
    <div className={styles.carousel}>
        <CarouselContext.Provider 
          value={currentIndex}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
            {children}
        </CarouselContext.Provider>
    </div>
  );
};

Carousel.propTypes = {
  children: propTypes.node.isRequired,
};

export default Carousel;
