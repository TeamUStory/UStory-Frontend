import propTypes from 'prop-types';

const CalenderIcon = ({color}) => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.70833 1V2.625M11.2917 1V2.625M1 12.375V4.25C1 3.81902 1.1712 3.4057 1.47595 3.10095C1.7807 2.79621 2.19402 2.625 2.625 2.625H12.375C12.806 2.625 13.2193 2.79621 13.524 3.10095C13.8288 3.4057 14 3.81902 14 4.25V12.375M1 12.375C1 12.806 1.1712 13.2193 1.47595 13.524C1.7807 13.8288 2.19402 14 2.625 14H12.375C12.806 14 13.2193 13.8288 13.524 13.524C13.8288 13.2193 14 12.806 14 12.375M1 12.375V6.95833C1 6.52736 1.1712 6.11403 1.47595 5.80928C1.7807 5.50454 2.19402 5.33333 2.625 5.33333H12.375C12.806 5.33333 13.2193 5.50454 13.524 5.80928C13.8288 6.11403 14 6.52736 14 6.95833V12.375" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

CalenderIcon.propTypes = {
    color: propTypes.string,
}


export default CalenderIcon;