import PropTypes from "prop-types";

const PlaceMark = ({color}) => {

    return (
        <svg width="25" height="30" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6788 12.1988C16.6788 13.3869 16.2068 14.5264 15.3666 15.3666C14.5264 16.2068 13.3869 16.6788 12.1988 16.6788C11.0106 16.6788 9.87107 16.2068 9.03091 15.3666C8.19075 14.5264 7.71875 13.3869 7.71875 12.1988C7.71875 11.0106 8.19075 9.87107 9.03091 9.03091C9.87107 8.19075 11.0106 7.71875 12.1988 7.71875C13.3869 7.71875 14.5264 8.19075 15.3666 9.03091C16.2068 9.87107 16.6788 11.0106 16.6788 12.1988Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23.4 12.2C23.4 22.8654 12.2 29 12.2 29C12.2 29 1 22.8654 1 12.2C1 9.22958 2.18 6.38081 4.2804 4.2804C6.38081 2.18 9.22958 1 12.2 1C15.1704 1 18.0192 2.18 20.1196 4.2804C22.22 6.38081 23.4 9.22958 23.4 12.2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
}

PlaceMark.propTypes = {
    color: PropTypes.string
}

export default PlaceMark;