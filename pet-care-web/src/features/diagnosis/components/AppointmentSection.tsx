import { Colors } from "../../../constants/Colors";
import { FaEye } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import type { Appointment } from "../types/Appointment";
import type { Pet } from "../types/Pet";

interface Props {
  appointments: Appointment[];
  onRowClick: (pet: Pet) => void;
  onOpenDiagnosis: (pet: Pet) => void; 
}

export default function AppointmentSection({ appointments, onRowClick, onOpenDiagnosis }: Props) {
  const appointment = appointments.filter((a) => a.status === "CONFIRMED");
  return (
    <div>
      <h3 style={styles.title}>Confirmed Consultations</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Pet</th>
            <th style={styles.th}>Owner</th>
            <th style={styles.th}>Reason</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointment.length === 0 ? (
            <tr><td colSpan={4} style={styles.empty}>No general consultations confirmed</td></tr>
          ) : (
            appointment.map((a) => (
              <tr key={a.id} style={styles.row}>
                <td style={styles.td}><strong>{a.pet_name}</strong></td>
                <td style={styles.td}>{a.owner_name}</td>
                <td style={styles.td}><span style={{ color: Colors.info, fontWeight: 500 }}>{a.note}</span></td>
                <td style={styles.td}>
                  <div style={styles.actionGroup}>
                    <button style={styles.actionBtn} onClick={() => onRowClick(a)} title="View Note">
                      <FaEye size={14} color={Colors.primary} />
                      <span style={{ color: Colors.primary }}>Note</span>
                    </button>
                    
                    <button style={styles.actionBtnDiag} onClick={() => onOpenDiagnosis(a)} title="Khám bệnh">
                      <MdMedicalServices size={14} color={Colors.text_tag_green} />
                      <span style={{ color: Colors.text_tag_green }}>Examine</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  title: { margin: "0 0 16px 0", fontSize: 18, fontWeight: 600, color: Colors.text },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "12px 8px", textAlign: "left", color: Colors.text_secondary, borderBottom: `2px solid ${Colors.border}`, fontSize: 14 },
  td: { padding: "14px 8px", borderBottom: `1px solid ${Colors.border}`, fontSize: 14 },
  row: { transition: "background 0.2s" },
  empty: { textAlign: "center", padding: 20, color: "#94A3B8" },
  actionGroup: { display: "flex", gap: 10, justifyContent: "center" },
  actionBtn: { display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, background: Colors.bg_tag_blue, border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer" },
  actionBtnDiag: { display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, background: Colors.bg_tag_green, border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer" }
};