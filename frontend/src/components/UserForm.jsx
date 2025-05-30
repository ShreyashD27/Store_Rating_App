import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getToken } from "../utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().min(20).max(60).required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
 
  password: yup
    .string()
    .required("Password is required")
    .min(8)
    .max(16)
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  role: yup.string().required("Role is required"),
});

function UserForm() {
const { register, handleSubmit, reset, formState: { errors } } = useForm({
  resolver: yupResolver(schema)
});
  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/admin/add-user", data, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      alert("User added");
      reset();
    } catch (err) {
      alert("Failed to add user");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4>Add User</h4>
      <input {...register("name")} placeholder="Name" required />
      <input {...register("email")} placeholder="Email" required />
      <input {...register("address")} placeholder="Address" />
      <input {...register("password")} type="password" placeholder="Password" required />
      <select {...register("role")} required>
        <option value="">-- Select Role --</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="store_owner">Store Owner</option>
      </select>
      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;
