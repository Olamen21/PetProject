import Header from "../../../shared/components/Header";
import Sidebar from "../../../shared/components/Sidebar";
import avatar from "../../../assets/avatar_doctor.jpg";
import { useEffect, useState } from "react";
import SettingItem from "../../../shared/components/SettingItem";
import NotificationItem from "../../../shared/components/NotificationItem";
import WeeklyCalendar from "../components/AppointmentPage/WeeklyCalendar";
import PendingRequests from "../components/AppointmentPage/PendingRequests";
import {
  getAppointmentByVetId,
  getAllPet,
} from "../services/AppointmentService";
import { getProfile, getAllUser } from "../../../api/UserApi";
import type { AppointmentList } from "../types/AppoinmentList";
import type { Pet } from "../../diagnosis/types/Pet";
import type { User } from "../../ManagementUser/types/User";

function AppointmentPage() {
  const [openSettings, setOpenSettings] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);
  const [pendingList, setPendingList] = useState<AppointmentList[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const userData = await getProfile();
      console.log("User Data:", userData.id);
      const petListData = await getAppointmentByVetId(userData.id);
      const pets = await getAllPet();
      const users = await getAllUser();
      const mergedData: AppointmentList[] = petListData.map(
        (al: AppointmentList) => {
          const pet = pets.find((p: Pet) => p.id === al.pet_id);
          const owner = users.find((u: User) => u.id === pet?.owner_id);

          const appointmentDate = new Date(al.appointment_date);
          const dateUTC = appointmentDate.toISOString().split("T")[0]; // "2026-05-31"
          const timeUTC = appointmentDate
            .toISOString()
            .split("T")[1]
            .slice(0, 5); 

          console.log("Date (UTC):", dateUTC);
          console.log("Time (UTC):", timeUTC);

          return {
            id: al.id,
            petName: pet?.name || "Unknown Pet",
            species: pet?.species || "Unknown Species",
            owner: owner?.full_name || "Unknown Owner",
            date: dateUTC, 
            time: timeUTC, 
            user_note: al.user_note || "No reason provided",
          };
        },
      );
      console.log("Merged Appointment:", mergedData);

      setPendingList(mergedData);
    };
    loadData();
  }, []);

  const weeklySchedule = [
    { id: 101, petName: "Cún Đen", time: "09:00", day: "Mon", type: "vaccine" },
    {
      id: 102,
      petName: "Mèo MoChi",
      time: "10:30",
      day: "Wed",
      type: "checkup",
    },
    { id: 103, petName: "Bé Thỏ", time: "14:00", day: "Wed", type: "spa" },
    { id: 104, petName: "LuKu", time: "11:00", day: "Thu", type: "checkup" },
    { id: 105, petName: "Miu Miu", time: "16:00", day: "Sat", type: "vaccine" },
  ];

  const handleAccept = (id: number) => {
    alert(`Đã phê duyệt lịch hẹn số ${id}`);
    setPendingList(pendingList.filter((item) => item.id !== id));
  };

  const handleReject = (id: number) => {
    const reason = prompt("Nhập lý do từ chối lịch:");
    if (reason) {
      alert(`Đã từ chối lịch ${id}. Lý do: ${reason}`);
      setPendingList(pendingList.filter((item) => item.id !== id));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        backgroundColor: "#FAFAFA",
        minHeight: "100vh",
      }}
    >
      {openSidebar && <Sidebar />}

      <main
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Header
          user={{
            name: "Johen Doe",
            role: "ADMIN",
            avatarUrl: avatar,
          }}
          onToggleMenu={() => setOpenSidebar(!openSidebar)}
          onSearch={(q) => console.log("Search:", q)}
          onOpenNotifications={() => setOpenNotifications(!openNotifications)}
          onOpenSettings={() => setOpenSettings(!openSettings)}
        />

        {openSettings && <SettingItem />}
        {openNotifications && <NotificationItem />}

        <div style={styles.row}>
          <div style={styles.leftColumn}>
            <WeeklyCalendar weeklySchedule={weeklySchedule} />
          </div>

          <div style={styles.rightColumn}>
            <PendingRequests
              pendingList={pendingList}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    gap: "20px",
    marginTop: "20px",
    flex: 1,
  },
  leftColumn: {
    flex: 6,
    display: "flex",
    flexDirection: "column",
  },
  rightColumn: {
    flex: 4,
    display: "flex",
    flexDirection: "column",
  },
};

export default AppointmentPage;
