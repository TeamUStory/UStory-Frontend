import { useContext } from 'react';
import { CarouselContext } from './Carousel';
import styles from './Carousel.module.scss';
import PropTypes from 'prop-types';

const CarouselIndicator = () => {
  const { currentIndex, goToIndex, totalItems } = useContext(CarouselContext);

  return (
    <div className={styles.carouselIndicator}>
      {Array.from({ length: totalItems }).map((_, index) => (
        <button
          key={index}
          onClick={() => goToIndex(index)}
          className={`${styles.dot} ${currentIndex === index ? styles.active : ''}`}
        />
      ))}
    </div>
  );
};

CarouselIndicator.propTypes = {
  totalItems: PropTypes.number,
};

export default CarouselIndicator;
