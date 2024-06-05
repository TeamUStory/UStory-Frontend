import styles from './Carousel.module.scss';
import {Carousel} from './Carousel';
import PropTypes from 'prop-types';

const CarouselContent = ({ children, currentIndex }) => {
  
  return (
    <div 
      className={styles.carousel_content}
      style={{ transform: `translateX(${( - (currentIndex * 3)) * 100}%)` }}>
      {children}
    </div>
  );
};

Carousel.Content = CarouselContent;

CarouselContent.propTypes = {
  children: PropTypes.node,
  currentIndex: PropTypes.number,
};

export default CarouselContent;