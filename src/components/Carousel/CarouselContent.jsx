import styles from './Carousel.module.scss';
import {Carousel} from './Carousel';
import PropTypes from 'prop-types';

// CarouselItem을 감싸는 div
const CarouselContent = ({ children, currentIndex }) => {
  
  return (
    <div 
      className={styles.carousel_content}
      style={{ transform: `translateX(${( - (currentIndex * 3)) * 100}%)` }} // currentIndex * 3을 해서 각 페이지별로 currentIndex를 설정합니다.
    >
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