import PropTypes from 'prop-types';

const Plus = ({width, height, bgColor, color, bgHeight, bgWidth, className}) => {
    return (
        <div 
            className={className}
            style = {{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                width: bgWidth,
                height: bgHeight,
                backgroundColor: bgColor,
            }}
        >
                <svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1V21M21 11H1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    )
}

Plus.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    bgHeight: PropTypes.string.isRequired,
    bgWidth: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    className: PropTypes.string
}
export default Plus;
