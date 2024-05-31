import PropTypes from 'prop-types';

const PlaceSaveIcon = ({color}) => {
    return (
        <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.9488 1.50322C23.7088 1.70231 25 3.17841 25 4.90182V29L13 23.1672L1 29V4.90182C1 3.17841 2.2896 1.70231 4.0512 1.50322C9.99711 0.832261 16.0029 0.832261 21.9488 1.50322Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

PlaceSaveIcon.propTypes = {
    color: PropTypes.string
}

export default PlaceSaveIcon;