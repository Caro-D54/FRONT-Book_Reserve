import React, { useState } from "react";
import "./Library.css";

const Login = ({ onLogin = () => {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // valida mínimo (puedes reemplazar con validación real / llamada API)
    if (!email || !password) {
      alert("Por favor completa correo y contraseña.");
      return;
    }
    onLogin({ email, password });
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

          <button type="submit" className="btn btn-cta login-submit">Iniciar Sesión</button>

          <div className="login-footer">
            <span className="muted">¿No tienes una cuenta?</span>
            <button type="button" className="btn btn-link login-register" onClick={() => window.location.href = "/register"}>Regístrate</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;