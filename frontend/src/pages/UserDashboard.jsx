import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");

  const fetchStores = useCallback(async () => {
    const res = await axios.get("http://localhost:5000/api/user/stores", {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: {
        name: nameFilter,
        address: addressFilter,
      },
    });
    setStores(res.data);
  }, [nameFilter, addressFilter]);

  const rateStore = async (storeId, value) => {
    await axios.post(
      "http://localhost:5000/api/user/rate",
      { store_id: storeId, rating_value: value },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    fetchStores();
  };

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <Header />
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between flex-wrap mb-6">
          <h2 className="text-3xl font-bold text-gray-800">User Dashboard</h2>
          <Link
            to="/user/settings"
            className="text-blue-600 hover:underline text-sm"
          >
            Change Password
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            placeholder="Search by name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            placeholder="Search by address"
            value={addressFilter}
            onChange={(e) => setAddressFilter(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchStores}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Store Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stores.map((s) => (
            <div
              key={s.id}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {s.name}
              </h3>
              <p className="text-gray-600 mb-1">
                <strong>Address:</strong> {s.address}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Average Rating:</strong> {s.avg_rating || "N/A"}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Your Rating:</strong> {s.user_rating || "Not rated"}
              </p>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => rateStore(s.id, val)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-600 hover:text-white transition"
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
