import DatePicker  from 'react-datepicker';
import propTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import './Calender.scss';
import CalenderIcon from "@/assets/icons/CalenderIcon";

const RangeCalender = ({ startDate, endDate, onDateChange }) => {

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(dates) => {
          const [start, end] = dates;
          onDateChange(start, end);
        }}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        placeholderText="날짜 선택"
        dateFormat="yyyy/MM/dd"
        className="date-picker-input"
        showIcon
        maxDate={new Date()}
        icon={<CalenderIcon color="#AAA"/>}
        isClearable={true}
      />
    </div>
  );
};

RangeCalender.propTypes = {
  startDate: propTypes.instanceOf(Date),
  endDate: propTypes.instanceOf(Date),
  onDateChange: propTypes.func
};
export default RangeCalender;