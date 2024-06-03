import PropTypes from 'prop-types';

const DiaryIcon = ({ color, bgColor="white" }) => {
    return (
        <div
            style={{
                backgroundColor: bgColor,
                width: "43px",
                height: "43px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 4.04825C10.8021 2.08174 7.95253 0.995946 5 1.00001C3.59733 1.00001 2.25067 1.2394 1 1.68095V20.6327C2.28483 20.1805 3.63755 19.9503 5 19.9518C8.07333 19.9518 10.8773 21.1048 13 23M13 4.04825C15.1978 2.08163 18.0474 0.99582 21 1.00001C22.4027 1.00001 23.7493 1.2394 25 1.68095V20.6327C23.7152 20.1805 22.3624 19.9503 21 19.9518C18.0475 19.9477 15.1979 21.0335 13 23M13 4.04825V23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    )
}

DiaryIcon.propTypes = {
    color: PropTypes.string.isRequired,
    bgColor: PropTypes.string
}

export default DiaryIcon;