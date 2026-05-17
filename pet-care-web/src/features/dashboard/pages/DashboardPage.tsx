import Header from '../../../shared/components/Header';
import Sidebar from '../../../shared/components/Sidebar';
import avatar from '../../../assets/avatar_doctor.jpg';
import StatCard from '../components/StatCard';
import { LiaUserInjuredSolid } from "react-icons/lia";
import { FaRegCommentAlt } from "react-icons/fa";
import { LiaUserNurseSolid } from "react-icons/lia";
import { PiHospital } from "react-icons/pi";
import { Colors } from '../../../constants/Colors';
import DailyRevenueCard from '../components/DailyRevenueCard';
import PaymentsHistory from '../components/PaymentHistoryCard';
import UpcomingAppointments from '../components/UpcomingAppointments';
import { useState } from 'react';
import SettingItem from '../../../shared/components/SettingItem';
import NotificationItem from '../../../shared/components/NotificationItem';

function DashboardPage() {
  const [openSettings, setOpenSettings] = useState(false);
  const [openNotifications, setOpenNotification] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);
  const stats = [
    {
      title: "Total Patients",
      value: 1548,
      icon: <LiaUserInjuredSolid />,
      iconBg: Colors.bg_tag_green,
    },
    {
      title: "Consultations",
      value: 448,
      icon: <FaRegCommentAlt />,
      iconBg: Colors.pink_light,
    },
    {
      title: "Staff",
      value: 848,
      icon: <LiaUserNurseSolid />,
      iconBg: Colors.bg_tag_warning,
    },
    {
      title: "Total Rooms",
      value: 3100,
      icon: <PiHospital />,
      iconBg: Colors.bg_tag_green,
    },
  ];
  
  return (
    <div style={{ display: "flex", position: "relative" }}>
      {openSidebar && <Sidebar />}
      <main style={{ flex: 1, padding: "20px" }}>
        <Header
          user={{
            name: "Johen Doe",
            role: "ADMIN",
            avatarUrl: avatar,
          }}
          onToggleMenu={() => setOpenSidebar(!openSidebar)}
          onSearch={(q) => console.log("Search:", q)}
          onOpenNotifications={() => setOpenNotification(!openNotifications)}
          onOpenSettings={() => setOpenSettings(!openSettings)}
        />

        {openSettings && <SettingItem />}
        {openNotifications && <NotificationItem />}

        {/* Nội dung chính của Dashboard */}
        <div style={styles.row}>
          <div style={styles.leftColumn}>
            <div style={styles.content}>
               {stats.map((item, idx) => (
                <StatCard
                  key={idx}
                  title={item.title}
                  value={item.value}
                  icon={item.icon}
                  iconBg={item.iconBg}
                />
              ))}
            </div>
            <div style={styles.content}>
              <DailyRevenueCard/>
              <PaymentsHistory/>
            </div>
          </div>
          <div style={styles.rightColumn}>
            <UpcomingAppointments />
          </div>
        </div>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  content: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  row: {
    display: "flex", 
    justifyContent: "space-between", 
    width: "100%",
    gap: "20px",
  },
  leftColumn: {
    flex: 6, 
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  rightColumn: {
    flex: 4, 
  }
};

export default DashboardPage;