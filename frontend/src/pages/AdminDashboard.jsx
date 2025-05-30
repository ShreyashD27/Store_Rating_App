import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import Header from "../components/Header";
import UserForm from "../components/UserForm";
import StoreForm from "../components/StoreForm";
import UserList from "../components/UserList";
import StoreList from "../components/StoreList";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [showUserForm, setShowUserForm] = useState(false);
  const [showStoreForm, setShowStoreForm] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/stats", {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setStats(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-100 px-6 py-8">
      <Header />
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-purple-700 mb-6">Admin Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-100 text-purple-800 p-4 rounded-lg shadow">
            <p className="text-sm font-medium">Total Users</p>
            <p className="text-xl font-bold">{stats.total_users ?? "..."}</p>
          </div>
          <div className="bg-purple-100 text-purple-800 p-4 rounded-lg shadow">
            <p className="text-sm font-medium">Total Stores</p>
            <p className="text-xl font-bold">{stats.total_stores ?? "..."}</p>
          </div>
          <div className="bg-purple-100 text-purple-800 p-4 rounded-lg shadow">
            <p className="text-sm font-medium">Total Ratings</p>
            <p className="text-xl font-bold">{stats.total_ratings ?? "..."}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setShowUserForm(!showUserForm)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            {showUserForm ? "Hide User Form" : "Add User"}
          </button>
          <button
            onClick={() => setShowStoreForm(!showStoreForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {showStoreForm ? "Hide Store Form" : "Add Store"}
          </button>
        </div>

        {showUserForm && (
          <div className="mb-6 bg-gray-100 rounded-xl p-4 shadow-inner">
            <UserForm />
          </div>
        )}
        {showStoreForm && (
          <div className="mb-6 bg-gray-100 rounded-xl p-4 shadow-inner">
            <StoreForm />
          </div>
        )}

        <hr className="my-6" />

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">User List</h3>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <UserList />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Store List</h3>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <StoreList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
