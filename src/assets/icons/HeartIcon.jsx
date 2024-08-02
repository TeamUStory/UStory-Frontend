import PropTypes from "prop-types";

const HeartIcon = ({ color = "#FB8176", fill = "none", width="11px", height="10.08px" }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4.21094C12 2.69233 10.7173 1.46094 9.13511 1.46094C7.95261 1.46094 6.93694 2.14905 6.5 3.1311C6.06306 2.14905 5.04739 1.46094 3.86428 1.46094C2.28333 1.46094 1 2.69233 1 4.21094C1 8.62316 6.5 11.5443 6.5 11.5443C6.5 11.5443 12 8.62316 12 4.21094Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" fill={fill} />
        </svg>
    );
};

HeartIcon.propTypes = {
    color: PropTypes.string,
    fill: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};

export default HeartIcon;
