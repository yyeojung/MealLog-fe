import { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const Calendar = ({ className }: { className?: string }) => {
  const [value, onChange] = useState<Value>(new Date());
  console.log(value);

  return (
    <ReactCalendar
      locale="ko-KR"
      calendarType="hebrew"
      onChange={onChange}
      value={value}
      className={`rounded-2xl border border-white/20 bg-white/90 p-5 shadow-lg backdrop-blur-sm ${className}`}
      prev2Label={null}
      next2Label={null}
      formatDay={(_, date) => date.getDate().toString()}
      showFixedNumberOfWeeks={true}
    />
  );
};
export default Calendar;
