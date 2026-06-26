import Sidebar from "../../../shared/components/Sidebar";
import { useEffect, useState } from "react";

import WeeklyCalendar from "../components/AppointmentPage/WeeklyCalendar";
import PendingRequests from "../components/AppointmentPage/PendingRequests";
import {
  getAppointmentByVetId,
  getAllPet,
  markCompleteAppointment,
  cancelAppointment,
} from "../services/AppointmentService";
import { getProfile, getAllUser } from "../../../api/UserApi";
import type { AppointmentList } from "../types/AppoinmentList";
import type { Pet } from "../../diagnosis/types/Pet";
import type { User } from "../../../shared/types/User";

function AppointmentPage() {
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
          const dateUTC = appointmentDate.toISOString().split("T")[0];
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
            status: al.status,
          };
        },
      );
      console.log("Merged Appointment:", mergedData);

      setPendingList(mergedData);
    };
    loadData();
  }, []);

  const weeklySchedule = pendingList.map((apt) => ({
    id: apt.id,
    petName: apt.petName,
    time: apt.time,
    date: apt.date,
    type: apt.status,
  }));

  console.log("Weekly Schedule:", weeklySchedule);

  const handleAccept = async (id: number) => {
    const confirmAppointment = await markCompleteAppointment(id);
    if (confirmAppointment) {
      alert(`Đã xác nhận lịch ${id}`);
      setPendingList(pendingList.filter((item) => item.id !== id));
    } else {
      alert(`Xác nhận lịch ${id} thất bại. Vui lòng thử lại.`);
    }
  };

  const handleReject = async (id: number) => {
    const confirmReject = await cancelAppointment(id);
    console.log("Cancel Response:");
    if (confirmReject) {
      alert(`Đã từ chối lịch ${id}`);
      setPendingList(pendingList.filter((item) => item.id !== id));
    } else {
      alert(`Từ chối lịch ${id} thất bại. Vui lòng thử lại.`);
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
     <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
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
