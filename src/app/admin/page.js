"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

/**
 * ADMIN PAGE (TALKING TO API BACKEND)
 */
export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // Protection Logic
  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Fetch from BACKEND API
  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchTasks();
    }
  }, [user]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title || !desc) return alert("Fill fields!");

    // SEND TO BACKEND API
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, desc }),
    });

    if (res.ok) {
      setTitle("");
      setDesc("");
      fetchTasks(); // Refresh list from server
    }
  };

  const handleDelete = async (id) => {
    // DELETE VIA BACKEND API
    const res = await fetch(`/api/tasks?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchTasks(); // Refresh list from server
    }
  };

  if (loading || !user || user.role !== "admin") {
    return <div className="section container">Checking Permissions...</div>;
  }

  return (
    <div className="section container animate-fade">
      <header style={{ marginBottom: "40px", textAlign: "center" }}>
        <h1>Backend <span style={{ color: "var(--accent-primary)" }}>Admin</span></h1>
        <p style={{ color: "var(--text-muted)" }}>This data is stored on the SERVER in src/lib/db.json</p>
      </header>

      <div className="grid" style={{ gridTemplateColumns: "1fr 2fr" }}>
        <div className="glass" style={{ padding: "30px" }}>
          <h2>Add Task</h2>
          <form onSubmit={handleAddTask}>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Save to Server</button>
          </form>
        </div>

        <div className="glass" style={{ padding: "30px" }}>
          <h2>Server Records</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {tasks.map((task) => (
              <div key={task.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                <div>
                  <strong>{task.title}</strong>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{task.desc}</p>
                </div>
                <button onClick={() => handleDelete(task.id)} style={{ color: "var(--danger)", background: "none", border: "none" }}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
