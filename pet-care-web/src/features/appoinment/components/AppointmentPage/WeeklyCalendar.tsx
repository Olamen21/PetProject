import { Colors } from "../../../../constants/Colors";

interface Appointment {
  id: number;
  petName: string;
  time: string;
  date: string;
  type: string;
}

interface WeeklyCalendarProps {
  weeklySchedule: Appointment[];
}

function getStartOfWeek(date: Date): Date {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); 
  return new Date(date.setDate(diff));
}

function generateDaysOfWeekForCurrentWeek() {
  const today = new Date();
  const startOfWeek = getStartOfWeek(new Date(today)); 
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);

    const key = d.toISOString().split("T")[0]; 
    const label = `${days[d.getDay()]} ${String(d.getDate()).padStart(2, "0")}`;

    return { key, label, isToday: isSameDay(d, today) };
  });
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const daysOfWeek = generateDaysOfWeekForCurrentWeek();



const hours = Array.from({ length: 13 }, (_, i) => `${String(i + 8).padStart(2, "0")}:00`);

const serviceStyles: { [key: string]: React.CSSProperties } = {
  CONFIRMED: {
    backgroundColor: Colors.bg_tag_blue,
    color: Colors.purple,
    borderLeft: `3px solid ${Colors.primary_light}`,
  },
  PENDING: {
    backgroundColor: Colors.bg_tag_orange,
    color: Colors.text_tag_orange,
    borderLeft: `3px solid ${Colors.warning}`,
  },
};

export default function WeeklyCalendar({ weeklySchedule }: WeeklyCalendarProps) {
  return (
    <div style={styles.calendarContainer}>
      <div style={styles.calendarHeader}>
        <h2 style={styles.sectionTitle}>Weekly Schedule</h2>
        <span style={styles.dateBadge}>May 31 - June 06, 2026</span>
      </div>

      <div style={styles.calendarGridHeader}>
        <div style={styles.timeColumnLabel}>Time</div>
        {daysOfWeek.map((day) => (
          <div
            key={day.key}
            style={{
              ...styles.dayHeaderCell,
              ...(day.isToday ? styles.todayHeaderCell : {}),
            }}
          >
            {day.label}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {hours.map((hour) => (
          <div key={hour} style={styles.gridRow}>
            <div style={styles.timeCell}>{hour}</div>

            {daysOfWeek.map((day) => {
              const appointmentsInSlot = weeklySchedule.filter(
                (slot) => slot.date === day.key && slot.time.startsWith(hour.substring(0, 2))
              );

              return (
                <div key={day.key} style={styles.calendarCell}>
                  {appointmentsInSlot.map((matchSlot) => (
                    <div
                      key={matchSlot.id}
                      style={{
                        ...styles.scheduleBlock,
                        ...serviceStyles[matchSlot.type],
                      }}
                      title={`${matchSlot.time} - ${matchSlot.petName}`}
                    >
                      <div style={styles.timeBadge}>{matchSlot.time}</div>
                      <div style={styles.petNameText}>{matchSlot.petName}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  sectionTitle: { fontSize: "18px", fontWeight: "600", margin: 0, color: Colors.text },
  calendarContainer: {
    backgroundColor: Colors.white,
    borderRadius: "16px",
    padding: "20px",
    border: `1px solid ${Colors.border}`,
    display: "flex",
    flexDirection: "column",
    maxHeight: "calc(100vh - 150px)",
    overflowY: "auto",
  },
  calendarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${Colors.border}`,
    paddingBottom: "15px",
    marginBottom: "15px",
  },
  dateBadge: {
    fontSize: "13px",
    fontWeight: "600",
    color: Colors.primary,
    backgroundColor: Colors.bg_tag_green,
    padding: "6px 12px",
    borderRadius: "20px",
  },
  calendarGridHeader: {
    display: "flex",
    backgroundColor: Colors.sidebar,
    borderRadius: "8px",
    padding: "10px 0",
    borderBottom: `1px solid ${Colors.border}`,
    textAlign: "center",
  },
  timeColumnLabel: {
    width: "60px",
    fontSize: "13px",
    fontWeight: "600",
    color: Colors.text_secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dayHeaderCell: { flex: 1, fontSize: "13px", fontWeight: "600", color: Colors.text_secondary, padding: "4px 0" },
  todayHeaderCell: { backgroundColor: Colors.primary, color: Colors.white, borderRadius: "6px", fontWeight: "700" },
  gridRow: { display: "flex", borderBottom: `1px solid ${Colors.gray}`, minHeight: "75px" },
  timeCell: {
    width: "60px",
    fontSize: "13px",
    fontWeight: "600",
    color: Colors.text_secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRight: `1px solid ${Colors.gray}`,
  },
  calendarCell: {
    flex: 1,
    borderRight: `1px solid ${Colors.gray}`,
    padding: "4px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    backgroundColor: Colors.background,
    justifyContent: "center",
  },
  scheduleBlock: {
    padding: "4px 6px",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    fontSize: "11px",
    fontWeight: "600",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  timeBadge: { fontSize: "9px", backgroundColor: Colors.white, padding: "1px 3px", borderRadius: "3px", alignSelf: "flex-start" },
  petNameText: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
};