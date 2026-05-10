import { useState } from "react";
import type { Pet } from "../types/Pet";
import CommonButton from "../../../shared/components/CommonButton";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Colors } from "../../../constants/Colors";

type AllergyInputProps = {
  form: Pet;
  setForm: React.Dispatch<React.SetStateAction<Pet>>;
};

function AllergyInput({ form, setForm }: AllergyInputProps) {
  const [currentAllergy, setCurrentAllergy] = useState("");

  const addAllergy = () => {
    if (currentAllergy.trim() !== "") {
      setForm((prev) => ({
        ...prev,
        allergies: [...(prev.allergies ?? []), currentAllergy.trim()],
      }));
      setCurrentAllergy("");
    }
  };

  const removeAllergy = (index: number) => {
    setForm((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index),
    }));
  };

  return (
    <div style={styles.container}>
      <label style={styles.title}>Allergies</label>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          list="allergy-options"
          placeholder="Enter any allergies your pet has"
          value={currentAllergy}
          onChange={(e) => setCurrentAllergy(e.target.value)}
          style={styles.input}
        />
        <datalist id="allergy-options">
          <option value="Dust" />
          <option value="Pollen" />
          <option value="Food" />
        </datalist>

        <CommonButton onClick={addAllergy} Icon={FaPlus} iconSize={16} />
      </div>

      <div style={styles.list}>
        {(form.allergies ?? []).map((a, i) => (
          <div key={i} style={styles.tag}>
            <span style={styles.tagText}>{a}</span>
            <FaTimes
              style={styles.removeIcon}
              onClick={() => removeAllergy(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: 10,
  },
  title: {
    fontWeight: 600,
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: "14px",
    color: Colors.text,
    fontWeight: "500",
    padding: "0 10px",
    outline: "none",
    borderRadius: 8,
    height: 48,
    borderColor: Colors.gray,
    borderWidth: 1.5,
    borderStyle: "solid",
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: 8,
  },
  tag: {
    display: "flex",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    color: Colors.white,
    padding: "6px 10px",
    borderRadius: 16,
    gap: "6px",
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
  },
  removeIcon: {
    cursor: "pointer",
  },
};

export default AllergyInput;
