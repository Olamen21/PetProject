import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaRegCalendarAlt } from "react-icons/fa";
import { Colors } from "../../../constants/Colors";

const WeekCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getNextDays = (date: Date) => {
    return Array.from({ length: 4 }, (_, i) => {
      const d = new Date(date);
      d.setDate(date.getDate() + i);
      return d;
    });
  };

  const weekDays = getNextDays(currentDate);

  const handlePrevDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 4);
    setCurrentDate(newDate);
  };

  const handleNextDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 4);
    setCurrentDate(newDate);
  };

  return (
    <div style={styles.container}>
      <FaChevronLeft size={20} style={{ cursor: "pointer" }} onClick={handlePrevDate} />

      {weekDays.map((day, idx) => {
        const isToday =
          day.toDateString() === new Date().toDateString();
        return ( 
          <div
            key={idx}
            style={{
              ...styles.day,
              backgroundColor: isToday ? Colors.primary : Colors.background,
              color: isToday ? "#fff" : "#333",
              fontWeight: isToday ? "bold" : "normal",
            }}
          >
            {isToday && <FaRegCalendarAlt />}
            <div>
              <div>{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
              <div style={{ fontSize: "0.85rem" }}>
                {day.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </div>
            </div>
          </div>
        );
      })}

      <FaChevronRight size={20} style={{ cursor: "pointer" }} onClick={handleNextDate} />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { 
    display: "flex", 
    alignItems: "center", 
    gap: "10px", 
    justifyContent: "center" 
  }, 
  day: {
    padding: "10px 15px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  }
};

export default WeekCalendar;
