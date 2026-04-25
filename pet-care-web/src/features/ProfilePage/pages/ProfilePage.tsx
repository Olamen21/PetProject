
import Sidebar from "../../../shared/components/Sidebar";

import { Colors } from "../../../constants/Colors";
import ProfileStats from "../components/ProfileStats";

import ProfileCard from "../components/ProfileHeader";
import ProfileDetails from "../components/ProfileDetails";
import { useAuth } from "../../../context/AuthContext";

function ProfilePage() {
  const user = useAuth();

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      paddingLeft: 300,
      background: Colors.background,
    },
    main: {
      flex: 1,
      padding: "24px",

      minHeight: "100vh",
    },
    card: {
      background: Colors.white,
      borderRadius: "14px",
      overflow: "hidden",
      boxShadow: "0 4px 20px " + Colors.border,
    },
    banner: {
      height: "140px",
      background:
        "linear-gradient(90deg, " +
        Colors.primary +
        ", " +
        Colors.secondary +
        ")",
    },
  };

  return (
    <div style={styles.container}>
      <Sidebar />

      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.banner}></div>

          <ProfileCard
            name={user?.full_name || "Tên người dùng"}
            role={user?.role || "Vai trò"}
            imageUrl="https://www.shutterstock.com/image-photo/portrait-asian-female-doctor-wearing-260nw-2502070973.jpg"
            onEdit={() => navigation.navigate("/edit-profile")}
          />

          <ProfileStats />
          <ProfileDetails />
          {/* <ProfileSchedule /> */}
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
