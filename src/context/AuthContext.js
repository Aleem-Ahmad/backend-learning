"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // 1. IMPORT AXIOS

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("my_session");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email, password) => {
    try {
      // 2. USE AXIOS FOR LOGIN
      // Axios automatically handles JSON stringifying and parsing!
      const response = await axios.post("/api/auth/login", { email, password });

      const data = response.data; // Data is inside .data property

      setUser(data.user);
      localStorage.setItem("my_session", JSON.stringify(data.user));
      router.push("/");
    } catch (err) {
      // Axios puts server error messages in err.response.data
      alert(err.response?.data?.error || "Login failed");
    }
  };

  const handleSignup = async (email, password, role) => {
    try {
      // 3. USE AXIOS FOR SIGNUP
      const response = await axios.post("/api/auth/signup", { email, password, role });
      
      alert(response.data.message);
      router.push("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("my_session");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleSignup, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
