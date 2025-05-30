import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getToken } from "../utils/auth";

function StoreForm() {
  const { register, handleSubmit, reset } = useForm();
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    // Fetch store owner list
    axios
      .get("http://localhost:5000/api/admin/store-owners", {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setOwners(res.data))
      .catch(() => alert("Failed to load store owners"));
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/admin/add-store", data, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      alert("Store added");
      reset();
    } catch (err) {
      alert("Failed to add store");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "20px" }}>
      <h4>Add Store</h4>

      <input {...register("name")} placeholder="Store Name" required />
      <input {...register("email")} placeholder="Store Email" />
      <input {...register("address")} placeholder="Address" />

      <label>Store Owner</label>
      <select {...register("owner_id")} required>
        <option value="">-- Select Store Owner --</option>
        {owners.map((owner) => (
          <option key={owner.id} value={owner.id}>
            {owner.name} ({owner.email})
          </option>
        ))}
      </select>

      <button type="submit">Add Store</button>
    </form>
  );
}

export default StoreForm;
