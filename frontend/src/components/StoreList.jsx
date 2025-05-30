import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

function StoreList() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/stores", {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setStores(res.data));
  }, []);

  return (
    <ul>
      {stores.map((s) => (
        <li key={s.id}>
          <b>{s.name}</b> - {s.email} - {s.address} | Avg Rating:{" "}
          {s.avg_rating ? Number(s.avg_rating).toFixed(1) : "N/A"}
        </li>
      ))}
    </ul>
  );
}

export default StoreList;
