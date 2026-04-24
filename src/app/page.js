"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * FRONTEND HOME PAGE
 * Now fetches data from the real Server Backend!
 */
export default function HomePage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // FETCH DATA FROM SERVER
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  return (
    <div className="section container animate-fade">
      <header style={{ textAlign: "center", marginBottom: "80px" }}>
        <h1 style={{ fontSize: "4rem", marginBottom: "20px" }}>
          Real <span style={{ color: "var(--accent-primary)" }}>Full-Stack</span> Architecture
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto" }}>
          This page fetches data from the <strong>Backend API</strong> (api/tasks/route.js). 
          The data is saved in a JSON file on the server.
        </p>
        <div style={{ marginTop: "30px" }}>
          <Link href="/admin" className="btn btn-primary">Go to Admin Panel</Link>
        </div>
      </header>

      <section>
        <h2 style={{ marginBottom: "30px" }}>Current Tasks from Server</h2>
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
