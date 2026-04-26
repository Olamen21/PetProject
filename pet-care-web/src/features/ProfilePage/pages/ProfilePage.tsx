import Sidebar from "../../../shared/components/Sidebar";

import { Colors } from "../../../constants/Colors";
import ProfileStats from "../components/ProfilePage/ProfileStats";
import ProfileDetail from "../components/ProfilePage/ProfileDetails";
import { useAuth } from "../../../context/AuthContext";
import ProfileHeader from "../components/ProfilePage/ProfileHeader";

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
    avatarImage: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    border: "4px solid " + Colors.white,
    marginTop: "-60px",
    objectFit: "cover",
  },
  avatarFallback: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: Colors.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px",
    color: Colors.white,
    marginTop: "-60px", 
  },
  };

  return (
    <div style={styles.container}>
      <Sidebar />

      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.banner}></div>

          <ProfileHeader
            name={user?.full_name || "Tên người dùng"}
            role={user?.role || "Vai trò"}
            bio={user?.bio || "Chưa có thông tin cá nhân nào được cập nhật."}
            avatar={
              user?.avatar ? (
                <img src={user.avatar} alt="avatar" style={styles.avatarImage} />
              ) : (
                <div style={styles.avatarFallback}>
                  {user?.full_name?.charAt(0).toUpperCase() || "U"}
                </div>
              )
            }
            onEdit={() => navigation.navigate("/edit-profile")}
          />

          <ProfileStats
            tags={user?.tags || ["chưa có tag nào"]}
            experience_start_date={user?.experience_start_date}
          />

          <ProfileDetail
            fullName={user?.full_name || "Tên người dùng"}
            email={user?.email || "email"}
            dob={user?.date_of_birth || "dd/mm/yyyy"}
            phone={user?.phone || "(123) 456-7890"}
            clinicRoom={user?.doctorProfile?.clinic_room || "Chưa có phòng khám"}
            address={user?.address || "không có địa chỉ nào"}
            degree={user?.doctorProfile?.degree || "Chưa cập nhật bằng cấp"}
            experienceStart={user?.doctorProfile?.experience_start_date || "dd/mm/yyyy"}
          />

          {/* <ProfileSchedule /> */}
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
