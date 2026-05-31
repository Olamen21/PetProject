import { Colors } from "../../../constants/Colors";
import { IoClose } from "react-icons/io5";

interface Props {
  pet: {
    petName: string;
    ownerName: string;
    userNote?: string;
  };
  onClose: () => void;
}

export default function PetDetailModal({ pet, onClose }: Props) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        
        <div style={styles.header}>
          <h3 style={styles.title}>Pet Medical Profile</h3>
          <button style={styles.closeBtn} onClick={onClose}><IoClose size={22} /></button>
        </div>

        <div style={styles.body}>
          <p style={styles.infoLine}><strong>Pet Name:</strong> {pet.petName}</p>
          <p style={styles.infoLine}><strong>Owner:</strong> {pet.ownerName}</p>
          
          <div style={styles.noteSection}>
            <h4 style={styles.noteTitle}>User Note (Tình trạng từ chủ nuôi):</h4>
            <div style={styles.noteContent}>
              {pet.userNote ? `"${pet.userNote}"` : "Không có ghi chú nào được để lại."}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modalBox: { background: Colors.white, borderRadius: 16, width: 420, padding: 20, boxShadow: "0 10px 25px rgba(0,0,0,0.15)", animation: "fadeIn 0.2s ease" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${Colors.border}`, paddingBottom: 12, marginBottom: 16 },
  title: { margin: 0, fontSize: 18, fontWeight: 700, color: Colors.text },
  closeBtn: { background: "none", border: "none", cursor: "pointer", color: Colors.text_secondary, display: "flex", alignItems: "center" },
  infoLine: { margin: "0 0 10px 0", fontSize: 15, color: Colors.text },
  noteSection: { marginTop: 16, display: "flex", flexDirection: "column", gap: 8 },
  noteTitle: { margin: 0, fontSize: 14, color: Colors.text_secondary, fontWeight: 600 },
  noteContent: { background: "#F8FAFC", border: `1px solid ${Colors.border}`, borderRadius: 8, padding: 12, fontSize: 14, color: "#475569", fontStyle: "italic", lineHeight: "1.5" }
};