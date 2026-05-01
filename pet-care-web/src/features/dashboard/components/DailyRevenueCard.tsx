import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Colors } from "../../../constants/Colors";

interface RevenueData {
  date: string;
  income: number;
  expense: number;
}

const data: RevenueData[] = [
  { date: "10 May", income: 100, expense: 60 },
  { date: "11 May", income: 110, expense: 70 },
  { date: "12 May", income: 90, expense: 50 },
  { date: "13 May", income: 120, expense: 80 },
  { date: "14 May", income: 105, expense: 65 },
  { date: "15 May", income: 115, expense: 75 },
  { date: "16 May", income: 95, expense: 55 },
];

const DailyRevenueCard: React.FC = () => {
  return (
    <div
      style={styles.container}
    >
        <div style={styles.title}>
            Daily Revenue Report
        </div>
      {/* Header values */}
      <div
        style={styles.header}
      >
        <div style={{ color: Colors.text_verified, fontWeight: "bold", fontSize: "20px" }}>
          $32,485
        </div>
        <div style={{ color: Colors.text, fontWeight: "bold", fontSize: "16px" }}>
          $12,458
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={10}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill= {Colors.primary_light} />
          <Bar dataKey="expense" fill={Colors.primary} />
        </BarChart>
      </ResponsiveContainer>
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
    title: { 
        fontSize: "20px", 
        fontWeight: "bold", 
        padding: "10px 0",
        color: Colors.text,
        borderBottom: "2px solid " + Colors.gray,
    },
    header: {
        display: "flex",
        marginBottom: "16px",
        gap: "16px",
        alignItems: "center",
        marginTop: "10px",
    },
};


export default DailyRevenueCard;
