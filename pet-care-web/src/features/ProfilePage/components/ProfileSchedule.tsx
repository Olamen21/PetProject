
import React from "react";
import { Colors } from "../../../constants/Colors";

const ProfileSchedule: React.FC = () => {
  return (
    <div style={styles.sectionSchedule}>
      {/* Title */}
      <div style={styles.titleSchedule}>LỊCH LÀM VIỆC</div>

      {/* Days */}
      <div style={styles.days}>
        <div style={{ ...styles.day, ...styles.dayActive }}>T2</div>
        <div style={{ ...styles.day, ...styles.dayActive }}>T3</div>
        <div style={{ ...styles.day, ...styles.dayActive }}>T4</div>
        <div style={{ ...styles.day, ...styles.dayActive }}>T5</div>
        <div style={{ ...styles.day, ...styles.dayActive }}>T6</div>
        <div style={{ ...styles.day, ...styles.dayInactive }}>T7</div>
        <div style={{ ...styles.day, ...styles.dayInactive }}>CN</div>
      </div>

      {/* Time */}
      <div style={styles.timeRow}>
        <div style={styles.timeBox}>
          <div style={styles.timeLabel}>Giờ làm</div>
          <div style={styles.timeValue}>
            8:00
            <br />—<br />
            17:00
          </div>
        </div>

        <div style={styles.timeBox}>
          <div style={styles.timeLabel}>Tư vấn online</div>
          <div style={styles.timeValue}>
            17:00
            <br />—<br />
            20:00
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSchedule;

const styles: { [key: string]: React.CSSProperties } = {
  sectionSchedule: {
    padding: "20px 24px",
  },
  titleSchedule: {
    fontSize: "14px",
    fontWeight: 600,
    color: Colors.text,
    marginBottom: "12px",
    letterSpacing: "0.5px",
  },

  // DAYS
  days: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  day: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: 500,
  },
  dayActive: {
    background: Colors.primary,
    color: Colors.white,
  },
  dayInactive: {
    background: Colors.background,
    color: Colors.text,
  },
  timeRow: {
    display: "flex",
    gap: "12px",
  },
  timeBox: {
    flex: 1,
    background: Colors.background,
    borderRadius: "14px",
    padding: "14px",
  },
  timeLabel: {
    fontSize: "13px",
    color: Colors.text,
    marginBottom: "6px",
  },
  timeValue: {
    fontSize: "18px",
    fontWeight: 600,
    color: Colors.text,
    lineHeight: "1.4",
  },
};
