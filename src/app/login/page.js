"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

/**
 * LOGIN PAGE
 * 
 * Demonstrates:
 * 1. Form handling in React
 * 2. Using AuthContext to login
 * 3. Navigating between auth pages
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="section container animate-fade" style={{ maxWidth: "500px" }}>
      <div className="glass" style={{ padding: "40px" }}>
        <h1 style={{ marginBottom: "10px", textAlign: "center" }}>Welcome <span style={{ color: "var(--accent-primary)" }}>Back</span></h1>
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "30px" }}>
          Login to manage your local storage data.
        </p>

        <form onSubmit={onSubmit}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Email Address</label>
          <input 
            type="email" 
            required 
            placeholder="admin@example.com"
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

          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}>
            Login Now
          </button>
        </form>

        <p style={{ marginTop: "25px", textAlign: "center", color: "var(--text-muted)" }}>
          Don't have an account? <Link href="/signup" style={{ color: "var(--accent-secondary)", textDecoration: "none", fontWeight: "600" }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
