import propTypes from 'prop-types';

const XIcon = ({stroke, fill = "none", strokeWidth = 1.5}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke={stroke} className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}

XIcon.propTypes = {
  stroke: propTypes.string,
  fill: propTypes.string,
  strokeWidth: propTypes.number
}

export default XIcon;