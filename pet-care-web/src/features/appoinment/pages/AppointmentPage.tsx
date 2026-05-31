import Header from "../../../shared/components/Header";
import Sidebar from "../../../shared/components/Sidebar";
import avatar from "../../../assets/avatar_doctor.jpg";
import { useState } from "react";
import SettingItem from "../../../shared/components/SettingItem";
import NotificationItem from "../../../shared/components/NotificationItem";
import WeeklyCalendar from "../components/AppointmentPage/WeeklyCalendar";
import PendingRequests from "../components/AppointmentPage/PendingRequests";

function AppointmentPage() {
  const [openSettings, setOpenSettings] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);

  const [pendingList, setPendingList] = useState([
    {
      id: 1,
      petName: "Mèo LuLu",
      breed: "Anh lông ngắn",
      owner: "Nguyễn Văn A",
      time: "14:30",
      day: "Wed",
      reason: "Tiêm mũi 2 vắc xin 4 bệnh",
    },
    {
      id: 2,
      petName: "Chó Corgi Bơ",
      breed: "Corgi",
      owner: "Trần Thị B",
      time: "15:15",
      day: "Fri",
      reason: "Khám da liễu, ngứa tai",
    },
  ]);

  const weeklySchedule = [
    { id: 101, petName: "Cún Đen", time: "09:00", day: "Mon", type: "vaccine" },
    { id: 102, petName: "Mèo MoChi", time: "10:30", day: "Wed", type: "checkup" },
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
    <div style={{ display: "flex", position: "relative", backgroundColor: "#FAFAFA", minHeight: "100vh" }}>
      {openSidebar && <Sidebar />}

      <main style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
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