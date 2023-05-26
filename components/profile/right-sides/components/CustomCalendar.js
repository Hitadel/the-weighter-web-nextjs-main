import Calendar from "react-calendar";
import { calendar } from "../../../../utils/function/calendar";
import { useState, useEffect } from "react";

const CustomCalendar = ({ show, adjustData }) => {
    const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0))); // 선택된 날짜
    const [startDate, setStartDate] = useState(date);

    const calendarHandler = (event, show, selectedItem) => {
        const result = calendar(event, show);
        setDate(result[1]);
        return adjustData(result[0], result[1]);
      };

    return (
      <Calendar
        value={date}
        onChange={(e) => {
          calendarHandler(e, show, date);
        }}
        onViewChange={({ activeStartDate }) =>
        setStartDate(activeStartDate.getFullYear())
        }
        minDetail={show === "year" ? undefined : show === "month" ? "decade" : undefined}
        maxDetail={show === "year" ? "decade" : show === "month" ? "year" : undefined}
      />
    );
  }
  
export default CustomCalendar;
