import { useState } from "react";
import { Colors } from "../../../constants/Colors";
import { IoClose, IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";
import { MdSave } from "react-icons/md";
import type { DiagnosisData, MedicationItem } from "../types/DiagnosisData";
import type { Appointment } from "../types/Appointment";


interface Props {
  appointment: Appointment;
  onClose: () => void;
  onSave: (appointmentId: number, diagnosisData: DiagnosisData) => void;
}


export default function DiagnosisFormModal({ appointment, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<DiagnosisData>({
    symptoms: "",
    diagnosis: "",
    vet_notes: "",
    weight_at_exam: "",
    medications: [{ medication_name: "", dosage: "", duration: "" }],
    appointment_id: appointment.id,
    title: ""
  });

  const handleBaseChange = (
    key: keyof Omit<DiagnosisData, "medications">,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleMedicationChange = (
    index: number,
    key: keyof MedicationItem,
    value: string | number,
  ) => {
    const updatedMedications = [...formData.medications];
    updatedMedications[index] = { ...updatedMedications[index], [key]: value };
    setFormData((prev) => ({ ...prev, medications: updatedMedications }));
  };

  const addMedicationRow = () => {
    setFormData((prev) => ({
      ...prev,
      medications: [
        ...prev.medications,
        { medication_name: "", dosage: "", duration: "" },
      ],
    }));
  };

  const removeMedicationRow = (index: number) => {
    if (formData.medications.length === 1) {
      alert("Đơn thuốc phải có ít nhất một loại thuốc!");
      return;
    }
    const updatedMedications = formData.medications.filter(
      (_, i) => i !== index,
    );
    setFormData((prev) => ({ ...prev, medications: updatedMedications }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.diagnosis.trim()) {
      alert("Vui lòng nhập Chẩn đoán bệnh!");
      return;
    }

    const hasInvalidMed = formData.medications.some(
      (med) =>
        !med.medication_name.trim() ||
        !med.dosage.trim() ||
        med.duration === "",
    );
    if (hasInvalidMed) {
      alert("Vui lòng điền đầy đủ thông tin thuốc!");
      return;
    }

    onSave(appointment.id, formData);
    onClose();
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <h3 style={styles.title}>Medical Examination</h3>
          <button style={styles.closeBtn} onClick={onClose}>
            <IoClose size={22} />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} style={styles.body}>
          <div style={styles.row}>
            <div style={{ ...styles.formGroup, flex: 2 }}>
              <span style={styles.label}>Bệnh nhân</span>
              <div style={styles.staticInfo}>
                <strong>{appointment.pet_name}</strong> ({appointment.owner_name})
              </div>
            </div>
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Cân nặng (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.weight_at_exam}
                onChange={(e) =>
                  handleBaseChange(
                    "weight_at_exam",
                    e.target.value ? parseFloat(e.target.value) : "",
                  )
                }
                placeholder="vd: 4.5"
                style={styles.input}
              />
            </div>
          </div>

          {/* Triệu chứng */}
           <div style={styles.formGroup}>
            <label style={styles.label}>Tiêu đề</label>
            <textarea
              value={formData.title}
              onChange={(e) => handleBaseChange("title", e.target.value)}
              placeholder="Tiêu đề của buổi khám...."
              style={styles.textarea}
              rows={2}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Triệu chứng lâm sàng</label>
            <textarea
              value={formData.symptoms}
              onChange={(e) => handleBaseChange("symptoms", e.target.value)}
              placeholder="Biểu hiện lâm sàng..."
              style={styles.textarea}
              rows={2}
            />
          </div>

          {/* Chẩn đoán */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Chẩn đoán bệnh <span style={styles.required}>*</span>
            </label>
            <textarea
              value={formData.diagnosis}
              onChange={(e) => handleBaseChange("diagnosis", e.target.value)}
              placeholder="Kết luận bệnh..."
              style={styles.textarea}
              rows={2}
            />
          </div>

          <div style={styles.prescriptionSection}>
            <div style={styles.prescriptionHeader}>
              <h4 style={styles.sectionTitle}>Toa thuốc chỉ định</h4>
              <button
                type="button"
                style={styles.btnAddMed}
                onClick={addMedicationRow}
              >
                <IoAddCircleOutline size={18} /> Thêm thuốc
              </button>
            </div>

            {formData.medications.map((med, index) => (
              <div key={index} style={styles.medicationRowCard}>
                <div style={styles.medRowHeader}>
                  <span style={styles.medIndexText}>Thuốc #{index + 1}</span>
                  {formData.medications.length > 1 && (
                    <button
                      type="button"
                      style={styles.btnDeleteMed}
                      onClick={() => removeMedicationRow(index)}
                    >
                      <IoTrashOutline size={16} /> Xóa
                    </button>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Tên thuốc <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    value={med.medication_name}
                    onChange={(e) =>
                      handleMedicationChange(
                        index,
                        "medication_name",
                        e.target.value,
                      )
                    }
                    placeholder="Tên thuốc, hàm lượng..."
                    style={styles.input}
                  />
                </div>

                <div style={styles.row}>
                  <div style={{ ...styles.formGroup, flex: 2 }}>
                    <label style={styles.label}>
                      Liều lượng & Cách dùng{" "}
                      <span style={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      value={med.dosage}
                      onChange={(e) =>
                        handleMedicationChange(index, "dosage", e.target.value)
                      }
                      placeholder="Ví dụ: 1 viên/ngày, sau ăn"
                      style={styles.input}
                    />
                  </div>
                  <div style={{ ...styles.formGroup, flex: 1 }}>
                    <label style={styles.label}>
                      Số ngày <span style={styles.required}>*</span>
                    </label>
                    <input
                      type="number"
                      value={med.duration}
                      onChange={(e) =>
                        handleMedicationChange(
                          index,
                          "duration",
                          e.target.value ? parseInt(e.target.value) : "",
                        )
                      }
                      placeholder="Ngày"
                      style={styles.input}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ghi chú bác sĩ */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Ghi chú dặn dò (Vet Notes)</label>
            <textarea
              value={formData.vet_notes}
              onChange={(e) => handleBaseChange("vet_notes", e.target.value)}
              placeholder="Lời dặn tái khám, chế độ ăn..."
              style={styles.textarea}
              rows={2}
            />
          </div>

          {/* Footer Buttons */}
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
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(15, 23, 42, 0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(2px)",
  },
  modalBox: {
    background: Colors.white || "#fff",
    borderRadius: 20,
    width: 540,
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "24px",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${Colors.border || "#E2E8F0"}`,
    paddingBottom: 14,
    marginBottom: 16,
  },
  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    color: Colors.text || "#1E293B",
  },
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: Colors.text_secondary || "#64748B",
    display: "flex",
    alignItems: "center",
  },
  body: { display: "flex", flexDirection: "column", gap: 16 },
  row: { display: "flex", gap: 12, width: "100%" },
  formGroup: { display: "flex", flexDirection: "column", gap: 6 },
  staticInfo: {
    padding: "10px 14px",
    background: "#F8FAFC",
    borderRadius: 10,
    border: "1px solid #E2E8F0",
    fontSize: 14,
    color: "#334155",
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: Colors.text_secondary || "#475569",
  },
  required: { color: "#EF4444", marginLeft: 2 },
  input: {
    padding: "10px 14px",
    borderRadius: 10,
    border: `1px solid ${Colors.border || "#CBD5E1"}`,
    outline: "none",
    fontSize: 14,
    fontFamily: "inherit",
  },
  textarea: {
    padding: "10px 14px",
    borderRadius: 10,
    border: `1px solid ${Colors.border || "#CBD5E1"}`,
    outline: "none",
    fontSize: 14,
    fontFamily: "inherit",
    resize: "none",
  },

  prescriptionSection: { display: "flex", flexDirection: "column", gap: 12 },
  prescriptionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    margin: 0,
    fontSize: 15,
    fontWeight: 700,
    color: Colors.primary || "#2563EB",
  },
  btnAddMed: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    background: "#EFF6FF",
    color: "#1D4ED8",
    border: "1px solid #BFDBFE",
    padding: "6px 12px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  medicationRowCard: {
    background: "#F8FAFC",
    border: "1px solid #E2E8F0",
    borderRadius: 12,
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  medRowHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 4,
    borderBottom: "1px dashed #E2E8F0",
  },
  medIndexText: { fontSize: 12, fontWeight: 700, color: "#64748B" },
  btnDeleteMed: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    background: "none",
    border: "none",
    color: "#EF4444",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
  },

  actionRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 10,
    paddingTop: 14,
    borderTop: `1px solid ${Colors.border || "#E2E8F0"}`,
  },
  btnCancel: {
    padding: "10px 20px",
    background: "#F1F5F9",
    color: "#64748B",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
  },
  btnSubmit: {
    padding: "10px 20px",
    background: Colors.primary || "#2563EB",
    color: Colors.white || "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
};
