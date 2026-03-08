"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";





export default function Signup(){




  const [currForm, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "member"
  });

const handleChange = (e : any) => {
    const name = e.target.name;
    const value = e.target.value;


        setForm({  
      ...currForm,
      [name]: value
    });
  };

  const handleSubmit = async (e: any) => {
  e.preventDefault();

  const res = await fetch("http://127.0.0.1:8000/api/auth/register", { // may change this to point to proper clodu later
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(currForm)
  });
};
  


return (
  <div className="container mt-9">
    <div className="row justify-content-center">
      <div className="col-md-4">

        <div className="card p-9 shadow">
          <h3 className="text-center mb-4">Sign Up</h3>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <input className="form-control" name="name" placeholder="Name" onChange={handleChange}/>
            </div>

            <div className="mb-3">
              <input className="form-control" name="email" placeholder="Email" onChange={handleChange}/>
            </div>

            <div className="mb-3">
              <input className="form-control" name="password" type="password" placeholder="Password" onChange={handleChange}/>
            </div>

            <div className="mb-3">
              <input className="form-control" name="phone" placeholder="Phone" onChange={handleChange}/>
            </div>

            <div className="mb-3">
              <input className="form-control" name="address" placeholder="Address" onChange={handleChange}/>
            </div>

            <div className="mb-3">
              <select className="form-control" name="role" onChange={handleChange}>
                <option value="member">Member</option>
                <option value="librarian">Librarian</option>
              </select>
            </div>

                <button type="submit" className="btn btn-success w-100">Sign Up</button>
          </form>

        </div>

      </div>
    </div>
  </div>
  );
}