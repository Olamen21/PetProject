import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./features/auth/pages/SignUpPage";
import LoginPage from "./features/auth/pages/LoginPage";
import ProfilePage from "./features/ProfilePage/pages/ProfilePage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import EditProfilePage from "./features/ProfilePage/pages/EditProfilePage";
import { AuthProvider } from "./context/AuthProvider";
import ManagementUserPage from "./features/ManagementUser/pages/ManagementUserPage";
import SignUpUploadPage from "./features/auth/pages/SignUpUploadPage";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import ChangePasswordPage from "./features/ProfilePage/pages/ChangePasswordPage";
import Logout from "./shared/components/Logout";
import PetListPage from "./features/pet/pages/PetListPage";
import EditPetPage from "./features/pet/pages/EditPetPage";
import VaccinePage from "./features/vaccine/pages/VaccinePage";
import NewVaccinePage from "./features/vaccine/pages/NewVaccinePage";
import EditVaccine from "./features/vaccine/pages/EditVaccine";
import DetailVaccine from "./features/vaccine/pages/DetailVaccine";
import AppointmentPage from "./features/appoinment/pages/AppointmentPage";
import DiagnosisPage from "./features/diagnosis/pages/DiagnosisPage";
import ViewDetailUser from "./features/ManagementUser/pages/ViewDetailUser";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route
            path="/admin/management-user"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <ManagementUserPage />
              </ProtectedRoute>
            }
          />
          <Route path="/signup-upload" element={<SignUpUploadPage />} />
          <Route path="/change-password" element={<ChangePasswordPage/>}/>
          <Route path="/logout" element={<Logout/>} />
          <Route path="/pets" element={<PetListPage />} />
          <Route path="/edit-pet/:id" element={<EditPetPage />}/>
          <Route path="/vaccines" element={<VaccinePage />}/>
          <Route path="/new-vaccine" element={<NewVaccinePage />} />
          <Route path="/edit-vaccine/:id" element={<EditVaccine />} />
          <Route path="/detail-vaccine/:id" element={<DetailVaccine />} />
          <Route path="/vet/appointments" element={<AppointmentPage />} />
          <Route path='/vet/diagnosis' element={<DiagnosisPage />} />
          <Route path="/edit-user/:id" element={<ViewDetailUser/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
