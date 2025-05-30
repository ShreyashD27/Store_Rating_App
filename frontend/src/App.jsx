import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import StoreDashboard from "./pages/StoreDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserSettings from "./pages/UserSettings";
import StoreOwnerSettings from "./pages/StoreOwnerSettings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
<Route path="/user/settings" element={
  <ProtectedRoute allowedRoles={["user"]}>
    <UserSettings />
  </ProtectedRoute>
} />
<Route path="/store-owner/settings" element={
  <ProtectedRoute allowedRoles={["store_owner"]}>
    <StoreOwnerSettings />
  </ProtectedRoute>
} />
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/user" element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </ProtectedRoute>
        } />

        <Route path="/store-owner" element={
          <ProtectedRoute allowedRoles={["store_owner"]}>
            <StoreDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
