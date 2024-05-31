import propTypes from 'prop-types';

const CalenderIcon = ({color}) => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8333 10V13.5M32.1667 10V13.5M10 34.5V17C10 16.0717 10.3687 15.1815 11.0251 14.5251C11.6815 13.8687 12.5717 13.5 13.5 13.5H34.5C35.4283 13.5 36.3185 13.8687 36.9749 14.5251C37.6313 15.1815 38 16.0717 38 17V34.5M10 34.5C10 35.4283 10.3687 36.3185 11.0251 36.9749C11.6815 37.6313 12.5717 38 13.5 38H34.5C35.4283 38 36.3185 37.6313 36.9749 36.9749C37.6313 36.3185 38 35.4283 38 34.5M10 34.5V22.8333C10 21.9051 10.3687 21.0148 11.0251 20.3585C11.6815 19.7021 12.5717 19.3333 13.5 19.3333H34.5C35.4283 19.3333 36.3185 19.7021 36.9749 20.3585C37.6313 21.0148 38 21.9051 38 22.8333V34.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

CalenderIcon.propTypes = {
    color: propTypes.string,
}


export default CalenderIcon;