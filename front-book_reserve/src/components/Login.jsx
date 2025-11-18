import React, { useState } from "react";
import "./Library.css";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin = () => {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const[error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError(null);
    // valida mínimo (puedes reemplazar con validación real / llamada API)
    if (!email || !password) {
      alert("Por favor completa correo y contraseña.");
      return;
    }
    try {
      const response = await axiosInstance.post("/api/token/", { email, password });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      const me = await axiosInstance.get("/api/users/me/");
      localStorage.setItem("user", JSON.stringify(me.data));

      if (me.data.is_staff || me.data.is_superuser) {
        navigate("/admin/profile");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <main className="login-page">
      <div className="login-backdrop" />

      <div className="login-panel" role="dialog" aria-labelledby="login-title" aria-modal="true">
        <h1 id="login-title" className="login-title">Iniciar Sesión</h1>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label className="form-label" htmlFor="login-email">Correo Electrónico</label>
          <input
            id="login-email"
            type="email"
            className="form-control login-input"
            placeholder="usuario@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
          />

          <label className="form-label mt-3" htmlFor="login-password">Contraseña</label>
          <div className="password-row">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              className="form-control login-input"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
            <button
              type="button"
              className="btn-toggle-pass"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? "Ocultar" : "Ver"}
            </button>
          </div>
          {error && <p className="text-danger mt-2">{error}</p>}

          <button type="submit" className="btn btn-cta login-submit">Iniciar Sesión</button>

          <div className="login-footer">
            <span className="muted">¿No tienes una cuenta?</span>
            <button type="button" className="btn btn-link login-register" onClick={() => navigate("/register")}>Regístrate</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;