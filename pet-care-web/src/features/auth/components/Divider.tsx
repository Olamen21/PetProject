import React from "react";
import { Colors } from "../../../constants/Colors";

const Divider: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
    <div style={{ flex: 1, height: 1, backgroundColor: Colors.gray }} />
        <span style={{ margin: "0 10px", color: Colors.text, fontSize: 14 }}>{text}</span>
    <div style={{ flex: 1, height: 1, backgroundColor: Colors.gray }} />
  </div>
);

export default Divider;
