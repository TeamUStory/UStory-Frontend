import PropTypes from 'prop-types';

const CommentIcon = ({color}) => {

    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.731 9.875L1 1C7.53287 2.9 13.6934 5.90146 19.216 9.875C13.6937 13.8485 7.53353 16.8499 1.001 18.75L3.731 9.875ZM3.731 9.875H11.231" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

CommentIcon.propTypes = {
    color: PropTypes.string
}

export default CommentIcon;