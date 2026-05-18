import { LuDog } from "react-icons/lu";
import { Colors } from "../../../constants/Colors";
import CommonSelectInput from "../../../shared/components/CommonSelectInput";
import CommonTextInput from "../../../shared/components/CommonTextInput";
import type { Vaccine } from "../types/Vaccine"
import { MdOutlineVaccines } from "react-icons/md";

type VaccineInfoProps = {
    form: Vaccine;
    setForm: React.Dispatch<React.SetStateAction<Vaccine>>;
}

function VaccineInfo({form, setForm} : VaccineInfoProps) {
    return (
        <div style={styles.sectionCard}>
          <div style={styles.sectionTitle}>Info vaccine</div>
          <div style={styles.row}>
            <CommonTextInput 
              Icon={MdOutlineVaccines}
              placeholder="Vaccine's Name"
              value={form.name}
              onChangeText={(e) => setForm({...form, name: e.target.value})}
            />
          </div>
          <div style={styles.row}>
            <CommonTextInput 
              placeholder="Quantity"
              value={form.quantity?.toString() ?? ""}
              onChangeText={(e) => setForm({...form, quantity: Number(e.target.value)})}
            />
          </div>

          <div style={styles.row}>
            <CommonSelectInput
              Icon={LuDog}
              placeholder="Species"
              value={form.target_species}
              onChange={(e) => setForm({...form, target_species: e.target.value})}
              options={[
                {label: "Dog", value: "Dog"},
                {label: "Cat", value: "Cat"}
              ]}
            />
          </div>
        </div>
    )
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
};

export default VaccineInfo;