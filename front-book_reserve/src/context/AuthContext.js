import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAuthHeader = (access) => {
    if (access) {
    sessionStorage.setItem("access_token", access);
    axiosInstance.headers.common["Authorization"] = 'Bearer ${access}';
  } else {
    sessionStorage.removeItem("access_token");
    delete axiosInstance.headers.common["Authorization"];
  };
  };

  const getProfile = async () => {
    const res = await axiosInstance.get('/users/me/');
    setUser(res.data);
    return res.data;
    };

    useEffect(() => {
      const init = async () => {
        const access = sessionStorage.getItem("access_token");
        if (!access) { setLoading(false); return; }
        setAuthHeader(access);
        try { await getProfile();} catch(e) { setAuthHeader(null); setUser(null); }
        finally { setLoading(false); }
      };
      init();
    }, []);

    const login = async (mail, password) => {
      const resp = await axiosInstance.post('/users/login/', { email: mail, password });
      const {access, refresh} = resp.data;
      setAuthHeader(access);
      localStorage.setItem("refresh_token", refresh || "");
      return await getProfile();
    };

    const register = async (name, mail, password) => {
      const resp = await axiosInstance.post('/users/register/', { name, email: mail, password });
      if (resp.data?.access && resp.data?.refresh) {
        setAuthHeader(resp.data.access);
        localStorage.setItem("refresh_token", resp.data.refresh);
        return await getProfile();
      }
      return await login({mail, password});
    };

    const logout = () => {
      setAuthHeader(null);
      localStorage.removeItem("refresh_token");
      setUser(null);
    };

    return (
      <AuthContext.Provider value={{ user, loading, login, register, logout }}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
  



