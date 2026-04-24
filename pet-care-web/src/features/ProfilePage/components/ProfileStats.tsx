
import React from "react";
import { Colors } from "../../../constants/Colors";

const ProfileStats: React.FC = () => {
  return (
    <div style={styles.section}>
      {/* TAGS */}
      <div style={styles.tagContainer}>
        <div style={{ ...styles.tag, ...styles.tagGreen }}>
          Internal Medicine
        </div>
        <div style={{ ...styles.tag, ...styles.tagGreen }}>Dogs & Cats</div>
        <div style={{ ...styles.tag, ...styles.tagBlue }}>Ultrasound</div>
        <div style={{ ...styles.tag, ...styles.tagOrange }}>Dermatology</div>
      </div>

      {/* RATING */}
      <div style={styles.ratingRow}>
        <div style={styles.stars}>★★★★★</div>
        <div style={styles.ratingText}>4.9 • From 312 reviews</div>
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <div style={styles.statBox}>
          <div style={styles.statNumber}>1.2k</div>
          <div style={styles.statLabel}>Patients</div>
        </div>

        <div style={styles.statBox}>
          <div style={styles.statNumber}>4.9</div>
          <div style={styles.statLabel}>Rating</div>
        </div>

        <div style={styles.statBox}>
          <div style={styles.statNumber}>8</div>
          <div style={styles.statLabel}>Years of Experience</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;

const styles: { [key: string]: React.CSSProperties } = {
    section: {
      padding: "0 24px 20px 24px",
    },

  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "12px",
  },
  tag: {
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 500,
  },

  tagGreen: {
    background: Colors.bg_tag_green,
    color: Colors.text_tag_green,
  },
  tagBlue: {
    background: Colors.bg_tag_blue,
    color: Colors.text_tag_blue,
  },
  tagOrange: {
    background: Colors.bg_tag_orange,
    color: Colors.text_tag_orange,
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
  },
  stars: {
    color: Colors.stars,
    fontSize: "16px",
  },
  ratingText: {
    fontSize: "14px",
    color: Colors.text,
  },
  stats: {
    display: "flex",
    gap: "12px",
  },
  statBox: {
    flex: 1,
    background: Colors.background,
    borderRadius: "12px",
    padding: "14px",
    textAlign: "center",
  },
  statNumber: {
    fontSize: "20px",
    fontWeight: 600,
    color: Colors.text,
  },
  statLabel: {
    fontSize: "13px",
    color: Colors.text,
    marginTop: "4px",
  },
};
