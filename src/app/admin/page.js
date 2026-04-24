"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import Axios

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // FETCH TASKS WITH AXIOS
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data); // Axios put response body in .data
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchTasks();
    }
  }, [user]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title || !desc) return alert("Fill fields!");

    try {
      // POST WITH AXIOS (No need for JSON.stringify!)
      await axios.post("/api/tasks", { title, desc });
      setTitle("");
      setDesc("");
      fetchTasks();
    } catch (err) {
      alert("Error adding task");
    }
  };

  const handleDelete = async (id) => {
    try {
      // DELETE WITH AXIOS
      // We pass the ID as a query parameter
      await axios.delete(`/api/tasks`, { params: { id } });
      fetchTasks();
    } catch (err) {
      alert("Error deleting task");
    }
  };

  if (loading || !user || user.role !== "admin") {
    return <div className="section container">Loading...</div>;
  }

  return (
    <div className="section container animate-fade">
      <header style={{ marginBottom: "40px", textAlign: "center" }}>
        <h1>Backend Admin <span style={{ color: "var(--accent-primary)" }}>(Axios)</span></h1>
        <p style={{ color: "var(--text-muted)" }}>Managing server-side JSON database using Axios library.</p>
      </header>

      <div className="grid" style={{ gridTemplateColumns: "1fr 2fr" }}>
        <div className="glass" style={{ padding: "30px" }}>
          <h2>New Task</h2>
          <form onSubmit={handleAddTask}>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Save via Axios</button>
          </form>
        </div>

        <div className="glass" style={{ padding: "30px" }}>
          <h2>Database Records</h2>
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
