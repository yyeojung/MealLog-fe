import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/routes/paths";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const Calendar = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
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
      onClickDay={() => navigate(`${PATHS.LOGMEAL.path}?tab=전체`)}
    />
  );
};
export default Calendar;
