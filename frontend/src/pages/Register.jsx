import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await register(form.name, form.email, form.password);
    setLoading(false);
    if (res.ok) {
      toast.success("Registered");
      navigate("/dashboard");
    } else {
      toast.error(res.error || "Failed to register");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 480, margin: "0 auto" }}>
        <h2>Create account</h2>
        <form onSubmit={submit}>
          <label>Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button className="btn" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div style={{ marginTop: 12 }} className="small">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
