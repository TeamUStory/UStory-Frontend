import { useState } from "react";
import DatePicker  from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calender.scss';
import CalenderIcon from "@/assets/icons/CalenderIcon";

const RangeCalender = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(dates) => {
          const [start, end] = dates;
          setStartDate(start);
          setEndDate(end);
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
      />
    </div>
  );
};

export default RangeCalender;