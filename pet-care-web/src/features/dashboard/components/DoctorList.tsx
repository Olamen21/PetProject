import React from "react";
import { Colors } from "../../../constants/Colors";
import avatar from "../../../assets/avatar_doctor.jpg";
import { BsThreeDots } from "react-icons/bs";

interface Doctor {
  name: string;
  specialty: string;
  photo: string;
}

const doctors: Doctor[] = [
  {
    name: "Dr. Jaylon Stanton",
    specialty: "Dentist",
    photo: avatar,
  },
  {
    name: "Dr. Carla Schleifer",
    specialty: "Oculist",
    photo: avatar,
  },
  {
    name: "Dr. Hanna Geidt",
    specialty: "Surgeon",
    photo: avatar,
  },
];

const DoctorList: React.FC = () => {
  return (
    <div
      style={styles.container}
    >
      <div
        style={styles.header}
      >
        <span style={styles.title}>Doctor List</span>
        <span style={styles.subTitle}>Today</span>
      </div>

      {doctors.map((doc, idx) => (
        <div
          key={idx}
          style={styles.doctorItem}
        >
          <img
            src={doc.photo}
            alt={doc.name}
            style={styles.doctorPhoto}
          />
          <div style={styles.row}>
            <div>
              <div style={styles.doctorName}>{doc.name}</div>
              <div style={styles.doctorSpecialty}>{doc.specialty}</div>
            </div>
            <BsThreeDots size={20} color={Colors.text_secondary}/>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: "100%",
      maxWidth: "500px",
      borderRadius: "8px",
      boxShadow: "0 2px 6px" + Colors.gray,
      backgroundColor: Colors.white,
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
    title: {
      fontSize: "20px", 
      fontWeight: "bold", 
      color: Colors.text,
    },
    subTitle: { 
        fontSize: "14px", 
        color: Colors.text
    },
    doctorItem: {
        display: "flex",
        alignItems: "center",
        padding: "10px 0",
        gap: "12px",
    },
    doctorPhoto: {
        width: "50px",
        height: "50px",
        borderRadius: "8px",
        objectFit: "cover",
    },
    row: {
      display: "flex", 
      justifyContent: "space-between", 
      width: "100%",
    },
    doctorName: { 
        fontWeight: "bold", 
        color: Colors.text,
        marginBottom: "4px",
    },
    doctorSpecialty: { 
        fontSize: "14px", 
        color: Colors.text_secondary
    },
};

export default DoctorList;
