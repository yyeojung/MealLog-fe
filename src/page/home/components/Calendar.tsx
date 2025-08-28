import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/routes/paths";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import useApi from "@/hooks/useApi";
import { LoadingSection } from "@/components/shared";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const { request, loading } = useApi();
  const [value, setValue] = useState<Value>(new Date());
  const [mealDates, setMealDates] = useState<string[]>([]);

  useEffect(() => {
    const currentDate = value instanceof Date ? value : new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    request({
      url: `/meal/dates?year=${year}&month=${month}`,
      method: "get",
      onSuccess: (data) => {
        setMealDates(data.data.dates);
      },
    });
  }, [request, value]);

  const tileContent = ({ date, view }: any) => {
    if (view === "month") {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;
      if (mealDates.includes(dateString)) {
        return (
          <div className="meal-indicator">
            <div className="mx-auto mt-1 h-2 w-2 rounded-full bg-orange-400"></div>
          </div>
        );
      }
    }
    return null;
  };

  const tileDisabled = ({ date, view }: any) => {
    if (view === "month") {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;
      return !mealDates.includes(dateString);
    }
    return false;
  };

  const onClickDay = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;
    navigate(`${PATHS.LOGMEAL.path}?tab=all&date=${dateString}`);
  };

  if (loading) return <LoadingSection style={{ height: "447px" }} />;

  return (
    <ReactCalendar
      locale="ko-KR"
      calendarType="hebrew"
      onChange={(newValue) => setValue(newValue)}
      value={value}
      className={`rounded-2xl border border-white/20 bg-white/90 p-5 shadow-lg backdrop-blur-sm ${className}`}
      prev2Label={null}
      next2Label={null}
      formatDay={(_, date) => date.getDate().toString()}
      showFixedNumberOfWeeks={true}
      onClickDay={onClickDay}
      tileContent={tileContent}
      tileDisabled={tileDisabled}
      onActiveStartDateChange={({ activeStartDate }) => {
        if (activeStartDate) {
          setValue(activeStartDate);
        }
      }}
    />
  );
};

export default Calendar;
