"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

/**
 * SIGNUP PAGE
 * 
 * Demonstrates:
 * 1. Role-based selection (User vs Admin)
 * 2. Creating a new record in our "Users Database"
 */
export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const { handleSignup } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    handleSignup(email, password, role);
  };

  return (
    <div className="section container animate-fade" style={{ maxWidth: "500px" }}>
      <div className="glass" style={{ padding: "40px" }}>
        <h1 style={{ marginBottom: "10px", textAlign: "center" }}>Create <span style={{ color: "var(--accent-secondary)" }}>Account</span></h1>
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "30px" }}>
          Join the platform and select your role.
        </p>

        <form onSubmit={onSubmit}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Email Address</label>
          <input 
            type="email" 
            required 
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Password</label>
          <input 
            type="password" 
            required 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Select Your Role</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              background: "var(--card-bg)",
              border: "1px solid var(--glass-border)",
              borderRadius: "12px",
              color: "white",
              marginBottom: "20px",
              appearance: "none"
            }}
          >
            <option value="user">Standard User (View Only)</option>
            <option value="admin">Administrator (Manage Data)</option>
          </select>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Register Account
          </button>
        </form>

        <p style={{ marginTop: "25px", textAlign: "center", color: "var(--text-muted)" }}>
          Already have an account? <Link href="/login" style={{ color: "var(--accent-primary)", textDecoration: "none", fontWeight: "600" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
