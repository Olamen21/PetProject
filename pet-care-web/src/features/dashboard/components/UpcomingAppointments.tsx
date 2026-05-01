import React from "react";
import { IoCall } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { Colors } from "../../../constants/Colors";
import CustomCalendar from "./WeekCalendar";
import avatar_doctor from "../../../assets/avatar_doctor.jpg";
import { CiClock1 } from "react-icons/ci";

interface Appointment {
  name: string;
  type: string;
  time: string;
  cost?: string;
  photo: string;
}

const appointments: Appointment[] = [
  {
    name: "Shawn Hampton",
    type: "Emergency appointment",
    time: "10:00",
    cost: "$30",
    photo: avatar_doctor,
  },
  {
    name: "Polly Paul",
    type: "USG + Consultation",
    time: "10:30",
    cost: "$50",
    photo: avatar_doctor,
  },
  {
    name: "Johen Doe",
    type: "Laboratory screening",
    time: "11:00",
    cost: "$70",
    photo: avatar_doctor,
  },
  {
    name: "Harmani Doe",
    type: "Keeping pregnant",
    time: "11:30",
    photo: avatar_doctor,
  },
];

const UpcomingAppointments: React.FC = () => {
  return (
    <div
      style={styles.container}
    >
      <div
        style={styles.header}
      >
        Upcoming Appointments 
      </div>
        <CustomCalendar />
      {appointments.map((a, idx) => (
        <div
          key={idx}
          style={styles.appointment}
        >
          <div style={styles.row}>
            <div style={styles.doctorInfo}>
                <img
                src={a.photo}
                alt={a.name}
                style={styles.img}
                />
                <div>
                <div style={styles.doctorName}>{a.name}</div>
                <div style={styles.appointmentType}>{a.type}</div>
                </div>
            </div>
            <div style={styles.callButton}>
                <IoCall size={20} color={Colors.primary} />
            </div>
          </div>
          <div style={styles.row}>
            <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                <CiClock1 size={20} color={Colors.text_secondary} />
                <div style={styles.time}>{a.time}</div>
                {a.cost && <div style={styles.cost}>{a.cost}</div>}
            </div>
            <BsThreeDots size={20} color={Colors.text_secondary} />
          </div>
        </div>
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: "100%",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        backgroundColor: "#fff",
        padding: "16px",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "12px",
        borderBottom: "2px solid" + Colors.gray,
        paddingBottom: "8px",
    },
    appointment: {
        display: "flex",
        flexDirection: "column",   
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: "12px 0",
        borderBottom: "1px dashed #ccc",
        gap: "8px"               
    },
    img: {
        width: "50px",
        height: "50px",
        borderRadius: "8px",
        objectFit: "cover",
    },
    doctorName: { 
        fontSize: "14px", 
        color: Colors.text_secondary 
    },
    appointmentType: { 
        fontSize: "16px", 
        color: Colors.text, 
        fontWeight: "bold" 
    },
    callButton: { 
        display: "flex", 
        alignItems: "center", 
        gap: "12px" 
    },
    time: { 
        fontSize: "16px", 
        color: Colors.text,
    },
    cost: { 
        fontWeight: "bold", 
        color: Colors.text,
    },
    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    doctorInfo: { 
        display: "flex", 
        alignItems: "center", 
        gap: "12px" 
    }
};

export default UpcomingAppointments;
