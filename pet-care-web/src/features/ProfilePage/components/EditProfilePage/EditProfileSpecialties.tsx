import CommonTextInput from "../../../../shared/components/CommonTextInput";
import CommonButton from "../../../../shared/components/CommonButton";
import { Colors } from "../../../../constants/Colors";
import type { FormState } from "../../pages/EditProfilePage";

interface Props {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  newTag: string;
  setNewTag: React.Dispatch<React.SetStateAction<string>>;
}

function EditProfileSpecialties({ form, setForm, newTag, setNewTag }: Props) {
  const currentTags = Array.isArray(form.tags) ? form.tags : [];

  const addTag = () => {
    if (!newTag.trim()) return;
    setForm({ ...form, tags: [...currentTags, newTag.trim()] });
    setNewTag("");
  };

  const removeTag = (index: number) => {
    const updated = currentTags.filter((_, i) => i !== index);
    setForm({ ...form, tags: updated });
  };

  return (
    <div style={styles.sectionCard}>
      <div style={styles.sectionTitle}>Specialties</div>

      <div style={styles.tagContainer}>
        {currentTags.map((tag, index) => (
          <div key={index} style={styles.tag}>
            {tag}
            <span
              onClick={() => removeTag(index)}
              style={{ cursor: "pointer", marginLeft: 5 }}
            >
              ✕
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <CommonTextInput
          placeholder="Add new tag"
          value={newTag}
          onChangeText={(e) => setNewTag(e.target.value)}
        />
        <CommonButton title="Add" onClick={addTag} />
      </div>
    </div>
  );
}

export default EditProfileSpecialties;

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
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },
  tag: {
    padding: "6px 12px",
    borderRadius: 999,
    background: Colors.secondary,
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
};
