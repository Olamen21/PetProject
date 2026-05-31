import { useState } from "react";
import { Colors } from "../../../constants/Colors";
import { IoClose } from "react-icons/io5";
import { MdSave } from "react-icons/md";

interface Props {
  pet: {
    id: number;
    petName: string;
    ownerName: string;
  };
  onClose: () => void;
  onSave: (id: number, diagnosisData: { condition: string; prescription: string }) => void;
}

export default function DiagnosisFormModal({ pet, onClose, onSave }: Props) {
  const [condition, setCondition] = useState("");
  const [prescription, setPrescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!condition.trim() || !prescription.trim()) {
      alert("Vui lòng điền đầy đủ tình trạng bệnh và thuốc sử dụng!");
      return;
    }
    onSave(pet.id, { condition, prescription });
    onClose();
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        
        <div style={styles.header}>
          <h3 style={styles.title}>Medical Examination</h3>
          <button style={styles.closeBtn} onClick={onClose}><IoClose size={22} /></button>
        </div>

        <form onSubmit={handleSubmit} style={styles.body}>
          <p style={styles.infoLine}><strong>Bệnh nhân:</strong> {pet.petName} ({pet.ownerName})</p>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Tình trạng bệnh / Triệu chứng lâm sàng:</label>
            <textarea
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Nhập chẩn đoán bệnh của thú cưng..."
              style={styles.textarea}
              rows={3}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Thuốc sử dụng & Liều lượng:</label>
            <textarea
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              placeholder="Ví dụ: Amoxicillin 250mg (1 viên/ngày, uống sau ăn 5 ngày)..."
              style={styles.textarea}
              rows={4}
            />
          </div>

          <div style={styles.actionRow}>
            <button type="button" style={styles.btnCancel} onClick={onClose}>
              Hủy bỏ
            </button>
            <button type="submit" style={styles.btnSubmit}>
              <MdSave size={16} /> Lưu hồ sơ
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modalBox: { background: Colors.white, borderRadius: 16, width: 460, padding: 20, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${Colors.border}`, paddingBottom: 12, marginBottom: 16 },
  title: { margin: 0, fontSize: 18, fontWeight: 700, color: Colors.text },
  closeBtn: { background: "none", border: "none", cursor: "pointer", color: Colors.text_secondary, display: "flex", alignItems: "center" },
  body: { display: "flex", flexDirection: "column", gap: 16 },
  infoLine: { margin: 0, fontSize: 15, color: Colors.text },
  formGroup: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 14, fontWeight: 600, color: Colors.text_secondary },
  textarea: { padding: 10, borderRadius: 8, border: `1px solid ${Colors.border}`, outline: "none", fontSize: 14, fontFamily: "inherit", resize: "none" },
  actionRow: { display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 },
  btnCancel: { padding: "8px 16px", background: "#E2E8F0", color: "#475569", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 },
  btnSubmit: { padding: "8px 16px", background: Colors.primary, color: Colors.white, border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }
};