import { useState } from "react";
import DatePicker  from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calender.scss';
import CalenderIcon from "@/assets/icons/CalenderIcon";

const ReactDatePicker = () => {
  const [startDate, setStartDate] = useState(null);

	return (
		<div>
			<DatePicker
                placeholderText="날짜 선택"
                showIcon
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
                icon={<CalenderIcon color="#AAA" />}
                maxDate={new Date()}
			/>
		</div>
  );
};

export default ReactDatePicker;