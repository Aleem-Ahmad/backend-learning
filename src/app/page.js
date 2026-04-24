"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios"; // Import Axios

/**
 * FRONTEND HOME PAGE (Migrated to Axios)
 */
export default function HomePage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // GET DATA USING AXIOS
    axios.get("/api/tasks")
      .then(res => {
        setTasks(res.data); // Logic is cleaner: res.data is already an object
      })
      .catch(err => {
        console.error("Axios Error:", err);
      });
  }, []);

  return (
    <div className="section container animate-fade">
      <header style={{ textAlign: "center", marginBottom: "80px" }}>
        <h1 style={{ fontSize: "4rem", marginBottom: "20px" }}>
          Full-Stack with <span style={{ color: "var(--accent-primary)" }}>Axios</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto" }}>
          The frontend is now using the <strong>Axios</strong> library to communicate with the Backend API. 
          Axios is preferred by many developers for its simpler syntax and automatic JSON handling.
        </p>
        <div style={{ marginTop: "30px" }}>
          <Link href="/admin" className="btn btn-primary">Go to Admin Panel</Link>
        </div>
      </header>

      <section>
        <h2 style={{ marginBottom: "30px" }}>Live Data from Server</h2>
        <div className="grid">
          {tasks.map((task) => (
            <div key={task.id} className="glass" style={{ padding: "30px" }}>
              <h3>{task.title}</h3>
              <p style={{ color: "var(--text-muted)" }}>{task.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
