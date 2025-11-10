import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulate register/login for demo. Replace with real API calls.
  const register = async (name, email, password) => {
    const u = { name: name || "Usuario", email, requests: [] };
    setUser(u);
    return u;
  };

  const login = async (email, password) => {
    const u = { name: "Demo User", email, requests: [] };
    setUser(u);
    return u;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;