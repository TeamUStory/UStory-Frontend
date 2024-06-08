import { createContext, useState, useRef, Children } from 'react';
import propTypes from 'prop-types';
import styles from './Carousel.module.scss';

const CarouselContext = createContext();

export const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
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
    const CarouselItems = Children.toArray(children);

    if (currentIndex === CarouselItems.length - 1) {
      return;
    }

    setCurrentIndex(currentIndex + 1);
  };

  console.log(currentIndex);
  return (
    <div 
      className={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      ref={carouselRef}
    >
      <CarouselContext.Provider 
        value={currentIndex}
      >
          {children}
      </CarouselContext.Provider>
    </div>
  );
};

Carousel.propTypes = {
  children: propTypes.node.isRequired,
};

export { CarouselContext };
export default Carousel;
