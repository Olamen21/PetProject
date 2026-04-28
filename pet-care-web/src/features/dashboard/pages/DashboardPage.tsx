import Header from '../../../shared/components/Header';
import Sidebar from '../../../shared/components/Sidebar';
import avatar from '../../../assets/avatar_doctor.jpg';

function DashboardPage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "20px" }}>
        <Header
          user={{
            name: "Johen Doe",
            role: "ADMIN",
            avatarUrl: avatar,
          }}
          onToggleMenu={() => console.log("Toggle menu")}
          onSearch={(q) => console.log("Search:", q)}
          onOpenNotifications={() => console.log("Notifications")}
          onOpenSettings={() => console.log("Settings")}
        />

      </main>
    </div>
  );
}

export default DashboardPage;