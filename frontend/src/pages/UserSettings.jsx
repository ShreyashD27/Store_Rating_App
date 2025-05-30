import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getToken } from "../utils/auth";
import Header from "../components/Header";

function UserSettings() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/auth/change-password", data, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      alert("Password updated successfully");
      reset();
    } catch (err) {
      alert("Password update failed");
    }
  };

  return (
    <div>
      <Header />
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("oldPassword")} type="password" placeholder="Current Password" required />
        <input {...register("newPassword")} type="password" placeholder="New Password" required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UserSettings;
