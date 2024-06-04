import { Carousel } from './Carousel';
import PropTypes from 'prop-types';

const CarouselComponent = ({ children }) => {
  return (
    <Carousel>
      {/* {children.map((child, index) => (
        <Carousel.Content key={index}>
          {child}
        </Carousel.Content>
      ))} */}
      <Carousel.Content>
        {children}
      </Carousel.Content>
    </Carousel>
  );
};

CarouselComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default CarouselComponent;
