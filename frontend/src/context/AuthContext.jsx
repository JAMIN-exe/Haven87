import { useState } from "react";
import { login as loginApi } from "../api/api";
import AuthContext from "./auth-context";

function readStoredAuth() {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) return { token: null, user: null };

  try {
    return { token, user: JSON.parse(storedUser) };
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth);
  const { user, token } = auth;

  const login = async ({ email, password }) => {
    const res = await loginApi({ email, password });
    if (res.success) {
      setAuth({ token: res.data.token, user: res.data.user });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }
    return res;
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading: false, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
