import PropTypes from 'prop-types';

const HomeIcon = ({color, bgColor}) => {
    return (
        <div
            style={{
                backgroundColor: bgColor,
                width: "43px",
                height: "43px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11.6632L11.5611 1.37815C12.0801 0.873949 12.9199 0.873949 13.4377 1.37815L24 11.6632M3.65385 9.07904V20.7079C3.65385 21.4211 4.24831 22 4.98077 22H9.84615V16.4009C9.84615 15.6877 10.4406 15.1088 11.1731 15.1088H13.8269C14.5594 15.1088 15.1538 15.6877 15.1538 16.4009V22H20.0192C20.7517 22 21.3462 21.4211 21.3462 20.7079V9.07904M8.07692 22H17.8077" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>  
        </div>
    )
}

HomeIcon.propTypes = {
    color: PropTypes.string.isRequired,
    bgColor: PropTypes.string
}

export default HomeIcon;
