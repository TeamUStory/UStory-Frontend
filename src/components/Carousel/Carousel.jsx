import { createContext, useState, useRef, Children, useEffect } from 'react';
import propTypes from 'prop-types';
import styles from './Carousel.module.scss';

const CarouselContext = createContext();

export const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
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
    // console.log('handleNext');
    // console.log(Math.ceil(React.Children.count(children) / 3) - 1, currentIndex);
    // console.log(React.Children.count(children));
    const CarouselItems = Children.toArray(children);
    console.log(Children.toArray(children));

    if (currentIndex === CarouselItems.length - 1) {
      return;
    }
    // console.log(currentIndex + 1);
    setCurrentIndex(currentIndex + 1);
  };

  console.log(currentIndex);

  useEffect(() => {
    if (carouselRef.current) {
      setItemWidth(carouselRef.current.clientWidth);
    }
  }, []);
  console.log(carouselRef.current);
  return (
    <div 
      className={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
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

export default Carousel;
