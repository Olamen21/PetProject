import { Colors } from "../../../constants/Colors";
import { MdDoneAll } from "react-icons/md";

interface Props {
  vaccines: any[];
  onComplete: (id: number) => void;
  onRowClick: (pet: any) => void;
}

export default function VaccineSection({ vaccines, onComplete, onRowClick }: Props) {
  const pendingVaccines = vaccines.filter(v => v.status === "PENDING");

  return (
    <div>
      <h3 style={styles.title}>Vaccine Appointments (Pending)</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Pet</th>
            <th style={styles.th}>Owner</th>
            <th style={styles.th}>Vaccine</th>
            <th style={styles.th} style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingVaccines.length === 0 ? (
            <tr><td colSpan={4} style={styles.empty}>No pets waiting for vaccine</td></tr>
          ) : (
            pendingVaccines.map((v) => (
              <tr key={v.id} style={styles.row} onClick={() => onRowClick(v)}>
                <td style={styles.td}><strong>{v.petName}</strong></td>
                <td style={styles.td}>{v.ownerName}</td>
                <td style={styles.td}>
                  <span style={v.species === "Cat" ? styles.catTag : styles.dogTag}>{v.vaccineName}</span>
                </td>
                <td style={styles.td} style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                  <button style={styles.btnComplete} onClick={() => onComplete(v.id)}>
                    <MdDoneAll size={16} /> Complete
                  </button>
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
  row: { cursor: "pointer", transition: "background 0.2s" },
  empty: { textAlign: "center", padding: 20, color: "#94A3B8" },
  dogTag: { padding: "4px 8px", borderRadius: 6, background: Colors.bg_tag_orange, color: Colors.text_tag_orange, fontSize: 12, fontWeight: 600 },
  catTag: { padding: "4px 8px", borderRadius: 6, background: Colors.bg_tag_green, color: Colors.text_tag_green, fontSize: 12, fontWeight: 600 },
  btnComplete: { border: "none", background: Colors.bg_tag_blue, color: Colors.purple, padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }
};