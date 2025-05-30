import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function StoreDashboard() {
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [storeForm, setStoreForm] = useState({ name: "", email: "", address: "" });

  const headers = { Authorization: `Bearer ${getToken()}` };

  const fetchRatings = useCallback(() => {
    axios.get("http://localhost:5000/api/stores/ratings", { headers })
      .then((res) => setRatings(res.data));
    axios.get("http://localhost:5000/api/stores/average-rating", { headers })
      .then((res) => setAverage(res.data.avg_rating));
  }, [headers]);

  const createStore = async () => {
    try {
      await axios.post("http://localhost:5000/api/stores/create", storeForm, { headers });
      alert("Store created successfully");
      setShowForm(false);
      setStoreForm({ name: "", email: "", address: "" });
      fetchRatings(); // refresh
    } catch {
      alert("Store creation failed");
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <Header />
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mt-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Store Owner Dashboard</h2>

        <div className="mb-4">
          <p className="text-lg">
             Average Rating:{" "}
            <span className="font-semibold">
              {average ? Number(average).toFixed(2) : "N/A"}
            </span>
          </p>
          <Link
            to="/store-owner/settings"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Change Password
          </Link>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? "Cancel" : "Create My Store"}
          </button>

          {showForm && (
            <div className="mt-4 space-y-4">
              <input
                placeholder="Store Name"
                value={storeForm.name}
                onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                placeholder="Store Email"
                value={storeForm.email}
                onChange={(e) => setStoreForm({ ...storeForm, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                placeholder="Store Address"
                value={storeForm.address}
                onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={createStore}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Submit
              </button>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Submitted Ratings</h3>
          {ratings.length === 0 ? (
            <p className="text-gray-500">No ratings yet.</p>
          ) : (
            <ul className="space-y-2">
              {ratings.map((r, idx) => (
                <li
                  key={idx}
                  className="bg-gray-100 p-3 rounded-lg shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm text-gray-600">{r.email}</p>
                  </div>
                  <span className="text-yellow-600 font-medium">{r.rating_value} ⭐</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoreDashboard;
