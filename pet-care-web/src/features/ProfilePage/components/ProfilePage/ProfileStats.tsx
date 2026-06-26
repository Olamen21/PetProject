import React, { useState, useEffect } from "react";
import { Colors } from "../../../../constants/Colors";
import type { Rating } from "../../types/Rating";
import {
  calculateVetRating,
  countCompletedAppointments,
} from "../../services/profileService";

interface ProfileStatsProps {
  tags: string[];
  years_of_experience?: string | null;
  id?: number | null;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  tags,
  id,
  years_of_experience,
}) => {
  const colorStyles = [styles.tagGreen, styles.tagBlue, styles.tagOrange];
  const [rating, setRating] = useState<Rating | null>(null);
  const [countAppointment, setCountAppointment] = useState();

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;

      try {
        const dataRating = await calculateVetRating(String(id));
        setRating(dataRating);
        const dataCount = await countCompletedAppointments(String(id));
        setCountAppointment(dataCount);
      } catch (error) {
        console.error("Lỗi khi lấy rating:", error);
      }
    };

    loadData();
  }, [id]);

  return (
    <div style={styles.section}>
      {/* TAGS */}
      <div style={styles.tagContainer}>
        {tags.map((label, index) => {
          const colorStyle = colorStyles[index % colorStyles.length];
          return (
            <div key={index} style={{ ...styles.tag, ...colorStyle }}>
              {label}
            </div>
          );
        })}
      </div>

      {/* RATING */}
      <div style={styles.ratingRow}>
        <div style={styles.stars}>
          {Array.from({ length: 5 }, (_, i) => {
            const ratingValue = i + 1;
            if (
              rating?.averageRating &&
              ratingValue <= Math.floor(rating.averageRating) 
            ) {
              return <span key={i}>★</span>; 
            } else if (
              rating?.averageRating &&
              ratingValue === Math.ceil(rating.averageRating) &&
              !Number.isInteger(rating.averageRating)
            ) {
              return <span key={i}>☆</span>; 
            } else {
              return <span key={i}>☆</span>; 
            }
          })}
        </div>
        <div style={styles.ratingText}>
          {rating?.averageRating?.toFixed(1)} • From {rating?.totalReviews}{" "}
          reviews
        </div>
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <div style={styles.statBox}>
          <div style={styles.statNumber}>{countAppointment}</div>
          <div style={styles.statLabel}>Patients</div>
        </div>

        <div style={styles.statBox}>
          <div style={styles.statNumber}>{rating?.averageRating?.toFixed(1)}</div>
          <div style={styles.statLabel}>Rating</div>
        </div>

        <div style={styles.statBox}>
          <div style={styles.statNumber}>{years_of_experience}</div>
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
