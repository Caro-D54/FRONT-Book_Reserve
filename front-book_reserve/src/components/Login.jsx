import React, { useState } from "react";
import "./Library.css";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin = () => {} }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!mail || !password) {
      alert("Por favor completa correo y contraseña.");
      return;
    }

    try {
      // Login con mail y password
      const response = await axiosInstance.post("/users_management/token/", { mail, password });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // Obtener perfil del usuario autenticado
      const me = await axiosInstance.get("/users_management/me/", {
        headers: { Authorization: `Bearer ${response.data.access}` },
      });
      localStorage.setItem("user", JSON.stringify(me.data));

      // Redirigir según rol
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
          <label className="form-label" htmlFor="login-mail">Correo Electrónico</label>
          <input
            id="login-mail"
            type="email"
            className="form-control login-input"
            placeholder="usuario@ejemplo.com"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
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
