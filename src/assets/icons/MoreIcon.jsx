import propTypes from 'prop-types';

const MoreIcon = ({stroke, fill = "none", strokeWidth = 1.5}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke={stroke} className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>

  )
}

MoreIcon.propTypes = {
  stroke: propTypes.string,
  fill: propTypes.string,
  strokeWidth: propTypes.number
}

export default MoreIcon;