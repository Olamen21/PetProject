import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./features/auth/pages/SignUpPage";
import LoginPage from "./features/auth/pages/LoginPage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import ProfilePage from "./features/ProfilePage/pages/ProfilePage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import EditProfilePage from "./features/ProfilePage/pages/EditProfilePage";
import { AuthProvider } from "./context/AuthContext";
import ManagementUserPage from "./features/ManagementUser/pages/ManagementUserPage";
import SignUpUploadPage from "./features/auth/pages/SignUpUploadPage";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import ChangePasswordPage from "./features/ProfilePage/pages/ChangePasswordPage";
import Logout from "./shared/components/Logout";
import PetListPage from "./features/pet/pages/PetListPage";
import NewPetPage from "./features/pet/pages/NewPetPage";
import EditPetPage from "./features/pet/pages/EditPetPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "VET"]}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
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
          <Route path="/new-pet" element={<NewPetPage/>}/>
          <Route path="/edit-pet/:id" element={<EditPetPage />}/>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
