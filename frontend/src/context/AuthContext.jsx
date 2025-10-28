import React, { createContext, useContext, useEffect, useState } from "react";
import { setAuthToken } from "../api/axios";
import api from "../api/axios";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("sm_token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("sm_user")) || null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuthToken(token);
    if (token) localStorage.setItem("sm_token", token);
    else localStorage.removeItem("sm_token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("sm_user", JSON.stringify(user));
    else localStorage.removeItem("sm_user");
  }, [user]);

  async function login(email, password) {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token: tkn, user: u } = res.data;
      setToken(tkn);
      setUser(u);
      setAuthToken(tkn);
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false, error: e.response?.data?.error || e.message };
    } finally {
      setLoading(false);
    }
  }

  async function register(name, email, password) {
    setLoading(true);
    try {
      const res = await api.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      const { token: tkn, user: u } = res.data;
      setToken(tkn);
      setUser(u);
      setAuthToken(tkn);
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false, error: e.response?.data?.error || e.message };
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    setAuthToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, user, loading, login, register, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
