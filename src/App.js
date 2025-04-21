import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/pages/authpages/login';
import Home from './components/pages/users/jobscreens/dashboard';
import JobDetails from './components/pages/users/jobscreens/jobdetials';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import CompanyRegistration from './components/pages/companies/registercompanies';
import TalentHiveDashboard from './components/pages/companies/dashboardcomp';
function App() {
  const location = useLocation(); // Get the current route

  // Define routes where the sidebar should NOT be shown
  const hideSidebarRoutes = ["/", "/signup"];

  return (
    <div className="App">
      {/* Conditionally render Sidebar */}

      <Routes>
        
        <Route path="/" element={<TalentHiveDashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/companydashboard" element={<TalentHiveDashboard />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/admindashboard" element={< AdminDashboard/>} />


      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
