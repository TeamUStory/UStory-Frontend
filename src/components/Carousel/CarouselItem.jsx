import styles from './Carousel.module.scss';
import {Carousel} from './Carousel';
import PropTypes from 'prop-types';

const CarouselItem = ({ children }) => {
  return (
    <div className={styles.carousel_item}>
      {children}
    </div>
  );
};

Carousel.Item = CarouselItem;

CarouselItem.propTypes = {
  children: PropTypes.node,
};

export default CarouselItem;
