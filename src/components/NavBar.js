"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * UPDATED NAVBAR
 * 
 * Demonstrates:
 * 1. Conditional Rendering based on Auth state
 * 2. Role-based Visibility (Admin button only for admins)
 */
export default function Navbar() {
  const pathname = usePathname();
  const { user, handleLogout } = useAuth(); // Access auth state

  return (
    <nav className="glass" style={{ 
      margin: "20px auto", 
      maxWidth: "1100px", 
      padding: "15px 30px", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      position: "sticky",
      top: "20px",
      zIndex: 100
    }}>
      <Link href="/" style={{ 
        fontSize: "1.5rem", 
        fontWeight: "bold", 
        textDecoration: "none", 
        color: "var(--text-main)",
        letterSpacing: "-1px"
      }}>
        Next<span style={{ color: "var(--accent-primary)" }}>Auth</span>
      </Link>

      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <Link href="/" style={{ 
          textDecoration: "none", 
          color: pathname === "/" ? "var(--accent-primary)" : "var(--text-muted)",
          fontWeight: pathname === "/" ? "600" : "400",
          transition: "var(--transition-smooth)"
        }}>
          Home
        </Link>

        {/* ROLE BASED LINK: Only visible if logged in as Admin */}
        {user?.role === "admin" && (
          <Link href="/admin" style={{ 
            textDecoration: "none", 
            color: pathname === "/admin" ? "var(--accent-primary)" : "var(--text-muted)",
            fontWeight: pathname === "/admin" ? "600" : "400",
          }}>
            Admin Panel
          </Link>
        )}

        {!user ? (
          <>
            <Link href="/login" style={{ 
              textDecoration: "none", 
              color: "var(--text-main)",
              fontWeight: "500"
            }}>
              Login
            </Link>
            <Link href="/signup" className="btn btn-primary" style={{ padding: "8px 20px" }}>
              Get Started
            </Link>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "0.85rem", fontWeight: "600", margin: 0 }}>{user.email.split("@")[0]}</p>
              <p style={{ fontSize: "0.7rem", color: "var(--accent-secondary)", margin: 0, textTransform: "uppercase" }}>{user.role}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="btn btn-outline" 
              style={{ padding: "8px 15px", fontSize: "0.9rem", color: "var(--danger)" }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
