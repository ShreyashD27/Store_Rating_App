import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

function UserList() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setUsers(res.data));
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(filter.toLowerCase()) ||
      u.email.toLowerCase().includes(filter.toLowerCase()) ||
      u.address.toLowerCase().includes(filter.toLowerCase()) ||
      u.role.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        placeholder="Search by name/email/address/role"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <ul>
        {filtered.map((u) => (
          <li key={u.id}>
            <b>{u.name}</b> ({u.email}) - {u.address} - Role: {u.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
