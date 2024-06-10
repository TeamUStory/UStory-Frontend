import propTypes from 'prop-types';

const ClockIcon = ({stroke, fill = "none", strokeWidth = 1.5}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke={stroke} className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

ClockIcon.propTypes = {
  stroke: propTypes.string,
  fill: propTypes.string,
  strokeWidth: propTypes.number
}

export default ClockIcon;