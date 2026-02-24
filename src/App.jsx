import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import StudentsAction from "./pages/students/StudentsAction";
import Attendance from "./pages/Attendance";
import Academic from "./pages/Academic";
import EventCircular from "./pages/EventCircular";
import AddStudent from "./pages/students/AddStudent";
import NewRegistration from "./pages/students/NewRegistration";
// import BasicDetails from "./pages/students/BasicDetails";
// import ParentDetails from "./pages/students/ParentDetails";
// import StudentAddressDetails from "./pages/students/StudentAddressDetails";
// import PreviousSchoolDetails from "./pages/students/PreviousSchoolDetails";
// import FeePaymentsDetails from "./pages/students/FeePaymentsDetails";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SetNewPassword from "./pages/auth/reset-password";
import RegisterSchool from "./pages/auth/RegisterSchool";
import { ThemeProvider } from "./context/ThemeContext";
// import NewRegistrations from "./pages/students/NewRegistrations";
import NewAdmission from "./pages/students/NewAdmission";
import RegistrationList from "./pages/students/RegistrationList";
import AllSudent from "./pages/students/AllSudent";
import TransferCertifcate from "./pages/students/TransferCertifcate";
import StudentIdCard from "./pages/students/StudentIdCard";



function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* 🔓 Public (login) */}
          <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
              <Route path="/reset-password" element={<SetNewPassword/>} />
              <Route path="/registration" element={<RegisterSchool/>} />
              
            </Route>
          </Route>

          {/* 🔐 Protected (after login) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/student" element={<StudentsAction />} />
              <Route path='/student/add-student' element={<AddStudent />} />
              <Route path='/student/all-student' element={<AllSudent />} />
              <Route path='/student/new-admission' element={<NewAdmission />} />
              <Route path='/student/transfer-certificate' element={<TransferCertifcate />} />
              <Route path='/student/id-card' element={<StudentIdCard />} />
              <Route path='/student/new-registration' element={<NewRegistration />} />
                <Route path='/student/registration-list' element={<RegistrationList />} />
               
              
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/academic" element={<Academic />} />
              <Route path="/event-circular" element={<EventCircular />} />
            </Route>
          </Route>

          {/* Default */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
