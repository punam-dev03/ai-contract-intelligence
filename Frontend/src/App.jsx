import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import MyContracts from "./pages/MyContracts";
import DashboardLayout from "./layouts/DashboardLayout";
import Pricing from "./pages/Pricing";
import ContractDetail from "./pages/ContractDetail";
import CompareContracts from "./pages/CompareContracts";

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";


function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Dashboard */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        <Route index element={<Dashboard />} />

        <Route path="contracts" element={<MyContracts />} />

        <Route path="contracts/:id" element={<ContractDetail />} />

        <Route path="pricing" element={<Pricing />} />

        <Route path="compare" element={<CompareContracts />} />

        <Route path="profile" element={<Profile />} />

        <Route path="settings" element={<Settings />} />

        <Route path="analytics" element={<Analytics />} />


      </Route>

    </Routes>
  );
}

export default App;