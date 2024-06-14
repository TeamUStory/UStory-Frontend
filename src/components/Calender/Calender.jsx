import DatePicker  from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from "prop-types";
import ko from "date-fns/locale/ko"
import './Calender.scss';
import CalenderIcon from "@/assets/icons/CalenderIcon";

const Calender = ({ selectedDate, onDateChange }) => {
  const handleChange = (date) => {
    onDateChange(date);
  };
  selectedDate
	return (
		<div>
			<DatePicker
                placeholderText="날짜 선택"
                showIcon
                selected={new Date(selectedDate)}
                onChange={handleChange}
                dateFormat="yyyy/MM/dd"
                locale={ko}
                utcOffset={9 * 60}
                icon={<CalenderIcon color="#AAA"/>}
                maxDate={new Date()}
			/>
		</div>
  );
};
Calender.propTypes = {
  onDateChange: PropTypes.func,
  selectedDate: PropTypes.instanceOf(Date)
};
export default Calender;