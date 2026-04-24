import Sidebar from '../../../shared/components/Sidebar';

function DashboardPage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "20px" }}>
      </main>
    </div>
  );
}

export default DashboardPage;