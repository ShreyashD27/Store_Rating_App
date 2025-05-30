import React from "react";
import { logout, getUserFromToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = getUserFromToken();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header style={{ padding: "10px", background: "#eee", display: "flex", justifyContent: "space-between" }}>
      <span>Welcome, {user?.name} ({user?.role})</span>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}

export default Header;
