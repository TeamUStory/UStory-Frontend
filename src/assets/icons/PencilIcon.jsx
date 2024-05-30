import PropTypes from 'prop-types';

const PencilIcon = ({color = "black"}) => {
    return (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2399 2.72094L13.5375 1.42249C13.8081 1.15198 14.175 1 14.5575 1C14.9401 1 15.307 1.15198 15.5775 1.42249C15.848 1.69301 16 2.05991 16 2.44248C16 2.82505 15.848 3.19195 15.5775 3.46247L4.52457 14.5154C4.1179 14.9218 3.6164 15.2206 3.06536 15.3846L1 16L1.61538 13.9346C1.77943 13.3836 2.07817 12.8821 2.4846 12.4754L12.2406 2.72094H12.2399ZM12.2399 2.72094L14.2691 4.75014" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

PencilIcon.propTypes = {
    color:PropTypes.string
}
export default PencilIcon;
