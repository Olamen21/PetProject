import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { User } from "../../../shared/types/User";
import Sidebar from "../../../shared/components/Sidebar";
import CommonButton from "../../../shared/components/CommonButton";
import { MdArrowBack } from "react-icons/md";
import { Colors } from "../../../constants/Colors";
import UserBasicInfo from "../components/ManagementUserPage/UserBasicInfo";
import UserDoctorInfo from "../components/ManagementUserPage/UserDoctorInfo";
import { getVetById } from "../services/ManagementUser";


function ViewDetailUserPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await getVetById(String(id));
        setUser(data);
      } catch (error) {
        console.error("Lỗi khi tải thông tin user:", error);
      }
    };
    loadUserData();
  }, [id]);

  if (!user) {
    return (
      <div style={styles.container}>
        <Sidebar />
        <main style={styles.main}>
          <p>Đang tải dữ liệu...</p>
        </main>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Sidebar />

      <main style={styles.main}>
        <UserBasicInfo user={user} />
        {(user.role === "VET" || user.role === "PENDING_VET") && (
          <UserDoctorInfo doctorProfile={user.doctorProfile} />
        )}

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}
        >
          <CommonButton
            title="Back to List"
            Icon={MdArrowBack}
            onClick={() => window.history.back()}
            textColor={Colors.white}
          />
        </div>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    background: Colors.background,
  },
  main: {
    flex: 1,
    padding: "24px",
  },
};

export default ViewDetailUserPage;