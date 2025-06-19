import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === "admin" && password === "1234") {
      setUser({ username });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = (newUser) => {
    
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    login(username, password);
    navigate("/home");
  };

  return (
    <div>
      <input type="username" placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};


import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { register } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = () => {
        register({ username, password, confirmPassword });
        navigate("/home");
    };

    return (
        <div>
            <input type="username" placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirmar contraseña" onChange={(e) => setConfirmPassword(e.target.value)} />
            <button onClick={handleRegister}>Registrarse</button>
        </div>
    );
};

export default Register;
