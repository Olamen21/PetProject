import React from "react";
import { Colors } from "../../../constants/Colors";
import { LiaUserMdSolid } from "react-icons/lia";
import { IoIosTimer } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

interface Payment {
  doctor: string;
  service: string;
  amount: string;
  date: string;
}

const payments: Payment[] = [
  {
    doctor: "Dr. Johen Doe",
    service: "Kidney function test",
    amount: "$25.15",
    date: "Sunday, 16 May",
  },
  {
    doctor: "Dr. Michael Doe",
    service: "Emergency appointment",
    amount: "$99.15",
    date: "Sunday, 16 May",
  },
  {
    doctor: "Dr. Bertie Maxwell",
    service: "Complementation test",
    amount: "$40.45",
    date: "Sunday, 16 May",
  },
];

const PaymentsHistory: React.FC = () => {
  return (
    <div
      style={styles.container}
    >
      <div
        style={styles.header}
      >
        Payments history
      </div>

      {payments.map((p, idx) => (
        <div
          key={idx}
          style={styles.paymentItem}
        >
            <div style={styles.row}>
                <LiaUserMdSolid color={Colors.text_secondary} size={20}/>
                <div style={styles.doctorName}>{p.doctor}</div>
            </div>
            <div style={{...styles.row, justifyContent: "space-between", width: "100%"}}>
                <div style={styles.serviceName}>{p.service}</div>
                <div style={styles.amount}>{p.amount}</div>
            </div>
            <div style={{...styles.row, justifyContent: "space-between", width: "100%"}}>
                <div style={styles.row}>
                    <IoIosTimer size={20} color={Colors.text_secondary} style={{marginBottom: "5px"}}/>
                    <div style={styles.date}>{p.date}</div>
                </div>
                <BsThreeDots size={20} color={Colors.text_secondary} style={{marginLeft: "10px"}}/>
            </div>
        </div>
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: "100%",
        maxWidth: "600px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        backgroundColor: "#fff",
        padding: "16px",
    },
    header: {
        fontSize: "20px", 
        fontWeight: "bold", 
        padding: "10px 0",
        color: Colors.text,
        borderBottom: "2px solid " + Colors.gray,
    },
    paymentItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "12px 0",
        borderBottom: "2px dashed " + Colors.gray,
        gap: "10px"
    },
    row: {
        display: "flex", 
        alignItems: "center", 
        gap: "8px" 
    },
    doctorName: { 
        fontSize: "16px",
        color: Colors.text_secondary
    },
    serviceName: { 
        fontSize: "16px", 
        color: Colors.text,
        fontWeight: "600"
    },
    date: { 
        fontSize: "14px",
        color: Colors.text_secondary 
    },
    amount: { 
        fontWeight: "bold", 
        color: Colors.text,
    },
};

export default PaymentsHistory;
