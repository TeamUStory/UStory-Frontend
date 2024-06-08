import styles from './Carousel.module.scss';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CarouselContext } from './Carousel';

export const CarouselItem = ({ index, children }) => {
  const currentIndex = useContext(CarouselContext);

  return index === currentIndex ? (
    <div className={styles.carousel_item}>
      {children}
    </div>
  ) : null;
};

CarouselItem.propTypes = {
  index: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default CarouselItem;
