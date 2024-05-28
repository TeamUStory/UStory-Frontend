import PropTypes from 'prop-types';

const MyPageIcon = ({color, bgColor}) => {
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
            <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.0005 5.03846C13.0005 6.10952 12.579 7.13672 11.8288 7.89408C11.0786 8.65144 10.061 9.07692 9 9.07692C7.93899 9.07692 6.92144 8.65144 6.1712 7.89408C5.42095 7.13672 4.99947 6.10952 4.99947 5.03846C4.99947 3.96739 5.42095 2.94019 6.1712 2.18284C6.92144 1.42548 7.93899 1 9 1C10.061 1 11.0786 1.42548 11.8288 2.18284C12.579 2.94019 13.0005 3.96739 13.0005 5.03846ZM1 20.2424C1.03428 18.1234 1.89221 16.1029 3.38877 14.6167C4.88534 13.1304 6.90061 12.2974 9 12.2974C11.0994 12.2974 13.1147 13.1304 14.6112 14.6167C16.1078 16.1029 16.9657 18.1234 17 20.2424C14.4902 21.4042 11.7611 22.0038 9 22C6.14522 22 3.43552 21.3711 1 20.2424Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    )
}

MyPageIcon.propTypes = {
    color: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired
}

export default MyPageIcon;