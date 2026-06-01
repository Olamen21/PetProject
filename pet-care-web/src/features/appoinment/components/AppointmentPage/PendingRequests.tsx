import { Colors } from "../../../../constants/Colors";
import type { AppointmentList } from "../../types/AppoinmentList";



interface PendingRequestsProps {
  pendingList: AppointmentList[];
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}

export default function PendingRequests({ pendingList, onAccept, onReject }: PendingRequestsProps) {
  return (
    <div style={styles.sidebarRequests}>
      <h2 style={styles.sectionTitle}>New Requests ({pendingList.length})</h2>

      <div style={styles.pendingScrollList}>
        {pendingList.length === 0 ? (
          <p style={styles.emptyText}>No pending requests 🎉</p>
        ) : (
          pendingList.map((apt) => (
            <div key={apt.id} style={styles.requestCard}>
              <div style={styles.cardHeader}>
                <div>
                  <h4 style={styles.petName}>{apt.petName}</h4>
                  <p style={styles.petDetails}>Species: {apt.species}</p>
                  <p style={styles.petDetails}>Owner: {apt.owner}</p>
                </div>
                <span style={styles.requestTimeBadge}>
                  {apt.date} {apt.time}
                </span>
              </div>

              <div style={styles.reasonBox}>"{apt.user_note}"</div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button style={styles.btnAccept} onClick={() => onAccept(apt.id)}>
                  Accept
                </button>
                <button style={styles.btnReject} onClick={() => onReject(apt.id)}>
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  sectionTitle: { fontSize: "18px", fontWeight: "600", margin: 0, color: Colors.text },
  sidebarRequests: {
    backgroundColor: Colors.white,
    borderRadius: "16px",
    padding: "20px",
    border: `1px solid ${Colors.border}`,
    display: "flex",
    flexDirection: "column",
    maxHeight: "calc(100vh - 150px)",
  },
  pendingScrollList: { overflowY: "auto", flex: 1, marginTop: "15px", paddingRight: "5px" },
  emptyText: { textAlign: "center", color: "#94A3B8", marginTop: "40px" },
  requestCard: {
    backgroundColor: Colors.sidebar,
    border: `1px solid ${Colors.border}`,
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "15px",
  },
  cardHeader: { display: "flex", justifyContent: "space-between", marginBottom: "10px" },
  petName: { margin: 0, fontSize: "16px", fontWeight: "700" },
  petDetails: { margin: "2px 0 0 0", fontSize: "12px", color: "#64748B" },
  requestTimeBadge: {
    backgroundColor: Colors.gray,
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "700",
    alignSelf: "flex-start",
    color: Colors.text,
  },
  reasonBox: {
    backgroundColor: Colors.white,
    border: `1px solid ${Colors.border}`,
    borderRadius: "6px",
    padding: "8px 12px",
    fontSize: "13px",
    color: Colors.text_secondary,
    fontStyle: "italic",
    marginBottom: "12px",
  },
  btnAccept: {
    flex: 1,
    padding: "8px 0",
    backgroundColor: Colors.success,
    color: Colors.white,
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },
  btnReject: {
    flex: 1,
    padding: "8px 0",
    backgroundColor: Colors.bg_tag_orange,
    color: Colors.error,
    border: `1px solid ${Colors.error}`,
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },
};