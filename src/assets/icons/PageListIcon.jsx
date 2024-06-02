import PropTypes from 'prop-types';

const PageListIcon = ({color, bgColor}) => {
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
        <svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.3031 10.5031C14.3031 11.5109 13.9028 12.4775 13.1901 13.1901C12.4775 13.9028 11.5109 14.3031 10.5031 14.3031C9.4953 14.3031 8.52876 13.9028 7.81612 13.1901C7.10348 12.4775 6.70312 11.5109 6.70312 10.5031C6.70312 9.4953 7.10348 8.52876 7.81612 7.81612C8.52876 7.10348 9.4953 6.70313 10.5031 6.70312C11.5109 6.70312 12.4775 7.10348 13.1901 7.81612C13.9028 8.52876 14.3031 9.4953 14.3031 10.5031Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 10.5C20 19.5465 10.5 24.75 10.5 24.75C10.5 24.75 1 19.5465 1 10.5C1 7.98044 2.00089 5.56408 3.78249 3.78249C5.56408 2.00089 7.98044 1 10.5 1C13.0196 1 15.4359 2.00089 17.2175 3.78249C18.9991 5.56408 20 7.98044 20 10.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </div>
    )
}

PageListIcon.propTypes = {
    color: PropTypes.string.isRequired,
    bgColor: PropTypes.string
}

export default PageListIcon;