"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import "./signup.css";

export default function Signup() {
  const [currForm, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "member"
  });

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...currForm,
      [name]: value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("http://127.0.0.1:8000/api/auth/register", { // may change this to point to proper clodu later
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currForm)
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="signup-card">
            <h3 className="signup-title">Sign Up</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input className="form-control signup-input" name="name" placeholder="Name" onChange={handleChange}/>
              </div>

              <div className="mb-3">
                <input className="form-control signup-input" name="email" placeholder="Email" onChange={handleChange}/>
              </div>

              <div className="mb-3">
                <input className="form-control signup-input" name="password" type="password" placeholder="Password" onChange={handleChange}/>
              </div>

              <div className="mb-3">
                <input className="form-control signup-input" name="phone" placeholder="Phone" onChange={handleChange}/>
              </div>

              <div className="mb-3">
                <input className="form-control signup-input" name="address" placeholder="Address" onChange={handleChange}/>
              </div>

              <div className="mb-3">
                <select className="form-control signup-select" name="role" onChange={handleChange}>
                  <option value="member">Member</option>
                  <option value="librarian">Librarian</option>
                </select>
              </div>

              <button type="submit" className="signup-button">Sign Up</button>
            </form>

          </div>

        </div>
      </div>
    </div>
  );
}
