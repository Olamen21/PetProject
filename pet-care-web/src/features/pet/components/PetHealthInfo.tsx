import type React from "react";
import { Colors } from "../../../constants/Colors";
import type { Pet } from "../types/Pet";
import CommonSelectInput from "../../../shared/components/CommonSelectInput";
import AllergyInput from "./AllergyInput";

type PetHealthInfoProps = {
  form: Pet;
  setForm: React.Dispatch<React.SetStateAction<Pet>>;
};

function PetHealthInfo({ form, setForm }: PetHealthInfoProps) {
  return (
    <div style={styles.sectionCard}>
      <div style={styles.sectionTitle}>Health Information</div>

      <div style={styles.row}>
        <div style={{ flex: 1 }}>
          <CommonSelectInput
            placeholder="Is your pet spayed/neutered?"
            value={form.neutered}
            onChange={(e) => setForm({ ...form, neutered: e.target.value })}
            options={[
              { label: "Yes", value: "true" },
              { label: "No", value: "false" },
            ]}
          />
          <AllergyInput form={form} setForm={setForm} />
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  sectionCard: {
    background: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    boxShadow: "0 4px 12px " + Colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 16,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10,
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: Colors.sidebar,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default PetHealthInfo;
