import { FaCameraRetro } from "react-icons/fa";
import { Colors } from "../../../../constants/Colors";

function UserBasicInfo() {
    return (
        <div style={styles.sectionCard}>
            <div style={styles.sectionTitle}>Basic Info</div>
            <div style={styles.row}>
                <div style={styles.avatarWrapper}>
                    {/* {form.avatar_url ? (
                        <img
                            src={form.avatar_url}
                            alt="Avatar"
                            style={styles.avatarImage}
                        />
                        ) : (
                        <>
                            <FaCameraRetro size={24} />
                        </>
                    )} */}
                </div>
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


export default UserBasicInfo;
