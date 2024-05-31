import propTypes from 'prop-types';

const Circle = ({color = "#FB8176"}) => {
    return (
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4.5" cy="4.5" r="4.5" fill={color}/>
        </svg>
    )
}

Circle.propTypes = {
    color:propTypes  
}

export default Circle