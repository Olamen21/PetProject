import Sidebar from "../../../shared/components/Sidebar";
import React, { useState, useEffect } from "react";

import { Colors } from "../../../constants/Colors";
import ProfileStats from "../components/ProfilePage/ProfileStats";
import ProfileDetail from "../components/ProfilePage/ProfileDetails";
import ProfileHeader from "../components/ProfilePage/ProfileHeader";
import { getProfile } from "../../../api/UserApi";
import type { User } from "../../../shared/types/User";

function ProfilePage() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (error) {
        console.error("Lỗi khi lấy profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
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

  if (loading) {
    return (
      <div style={styles.container}>
        <Sidebar />
        <main style={styles.main}>
          <div style={styles.card}>
            <div style={styles.banner}></div>
            <div style={{ padding: "24px", textAlign: "center" }}>
              <p>Đang tải dữ liệu...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Sidebar />

      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.banner}></div>

          <ProfileHeader
            name={user?.full_name || "User Name"}
            role={user?.role || "Role"}
            bio={
              user?.doctorProfile?.bio ||
              "No personal information has been updated yet."
            }
            avatar={user?.avatar_url}
            onEditProfile={() => navigation.navigate("/edit-profile")}
            onChangePassword={() => navigation.navigate("/change-password")}
          />

          <ProfileStats
            tags={
              typeof user?.doctorProfile?.tags === "string"
                ? user.doctorProfile.tags.split(",").map((tag: string) => tag.trim())
                : Array.isArray(user?.doctorProfile?.tags)
                  ? user.doctorProfile.tags
                  : []
            }
            years_of_experience={user?.doctorProfile?.years_of_experience}
            id={user?.id}
          />

          <ProfileDetail
            fullName={user?.full_name || "User Name"}
            email={user?.email || "email"}
            dob={user?.date_of_birth || "dd/mm/yyyy"}
            phone={user?.phone || "(123) 456-7890"}
            clinicRoom={
              user?.doctorProfile?.clinic_room || "No clinic room available"
            }
            address={user?.address || "No address available"}
            degree={user?.doctorProfile?.degree || "Degree not updated yet"}
            experienceStart={
              user?.doctorProfile?.experience_start_date || "dd/mm/yyyy"
            }
          />
        </div>
      </main>
    </div>
  );
}


export default ProfilePage;
