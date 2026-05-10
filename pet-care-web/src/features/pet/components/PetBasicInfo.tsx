import type React from "react";
import { Colors } from "../../../constants/Colors";
import { useRef } from "react";
import type { Pet } from "../types/Pet";
import { FaCameraRetro } from "react-icons/fa";
import CommonTextInput from "../../../shared/components/CommonTextInput";
import {
  MdOutlinePets,
  MdOutlineHeight,
  MdMonitorWeight,
} from "react-icons/md";
import { LuDog } from "react-icons/lu";
import CommonSelectInput from "../../../shared/components/CommonSelectInput";
import { FaCat } from "react-icons/fa";
import { PiGenderIntersexBold } from "react-icons/pi";
import { FiCalendar } from "react-icons/fi";
import type { Breed } from "../types/Breed";

type PetBasicInfoProps = {
  form: Pet;
  setForm: React.Dispatch<React.SetStateAction<Pet>>;
  breeds: Breed[];
};

function PetBasicInfo({ form, setForm, breeds }: PetBasicInfoProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          avatar_url: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);

      setForm((prev: any) => ({
        ...prev,
        imageFile: file,
      }));
    }
  };

  return (
    <div style={styles.sectionCard}>
      <div style={styles.sectionTitle}>Basic Info</div>
      <div style={styles.row}>
        <div
          style={styles.avatarWrapper}
          onClick={() => fileInputRef.current?.click()}
        >
          {form.avatar_url ? (
            <img
              src={form.avatar_url}
              alt="Avatar"
              style={styles.avatarImage}
            />
          ) : (
            <>
              <FaCameraRetro size={24} />
            </>
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div style={styles.row}>
        <CommonTextInput
          Icon={MdOutlinePets}
          placeholder="Pet's Name"
          value={form.name}
          onChangeText={(e) => setForm({ ...form, name: e.target.value })}
        />

        <CommonSelectInput
          Icon={LuDog}
          placeholder="Species"
          value={form.species}
          onChange={(e) => setForm({ ...form, species: e.target.value })}
          options={[
            { label: "Dog", value: "Dog" },
            { label: "Cat", value: "Cat" },
          ]}
        />
      </div>

      <div style={styles.row}>
        <CommonSelectInput
          Icon={FaCat}
          placeholder="Breed"
          value={form.breed_id?.toString()}
          onChange={(e) =>
            setForm({ ...form, breed_id: Number(e.target.value) })
          }
          options={breeds.map((b) => ({
            label: b.name,
            value: b.id.toString(),
          }))}
        />

        <CommonSelectInput
          Icon={PiGenderIntersexBold}
          placeholder="Gender"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
        />
      </div>

      <div style={styles.row}>
        <CommonTextInput
          Icon={MdOutlineHeight}
          placeholder="Height"
          value={form.height?.toString() || ""}
          onChangeText={(e) =>
            setForm({ ...form, height: Number(e.target.value) })
          }
        />

        <CommonTextInput
          Icon={MdMonitorWeight}
          placeholder="Weight"
          value={form.weight?.toString() || ""}
          onChangeText={(e) =>
            setForm({ ...form, weight: Number(e.target.value) })
          }
        />
      </div>
      <div style={styles.row}>
        <CommonTextInput
          placeholder="Date of Birth"
          Icon={FiCalendar}
          type="date"
          value={form.dob}
          onChangeText={(e) => setForm({ ...form, dob: e.target.value })}
        />
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

export default PetBasicInfo;
