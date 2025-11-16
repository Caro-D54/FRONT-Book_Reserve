import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../components/Library.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!name.trim()) return setMessage({ type: "error", text: "El nombre es obligatorio." });
    if (!email.trim() || !validateEmail(email)) return setMessage({ type: "error", text: "Introduce un correo válido." });
    if (password.length < 6) return setMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres." });
    if (password !== confirm) return setMessage({ type: "error", text: "Las contraseñas no coinciden." });

    setSubmitting(true);

    try {
      await register({ name: name.trim(), mail: email.trim(), password });
      setMessage({ type: "success", text: "Registro completado. Redirigiendo..." });
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      console.error(err);
      const backendMessage =
        err?.response?.data?.error ||
        err?.response?.data?.detail ||
        "Error al registrar. Intenta de nuevo.";
      setMessage({ type: "error", text: backendMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="register-page nexus" aria-live="polite">
      <div className="register-backdrop" aria-hidden="true" />
      <section className="register-panel" role="region" aria-labelledby="register-title">
        <h1 id="register-title" className="register-title">Crear cuenta</h1>

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <label className="form-label" htmlFor="r-name">Nombre</label>
          <input id="r-name" className="register-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" required />

          <label className="form-label" htmlFor="r-email">Correo electrónico</label>
          <input id="r-email" className="register-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" required />

          <label className="form-label" htmlFor="r-pass">Contraseña</label>
          <div className="password-row">
            <input
              id="r-pass"
              className="register-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
            <button
              type="button"
              className="btn-toggle-pass"
              aria-pressed={showPassword}
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          <label className="form-label" htmlFor="r-confirm">Confirmar contraseña</label>
          <input id="r-confirm" className="register-input" type={showPassword ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} required />

          {message && (
            <div role="status" aria-live="polite" style={{ marginTop: 8 }}>
              <div
                style={{
                  color: message.type === "error" ? "#d9534f" : "#3c763d",
                  backgroundColor: message.type === "error" ? "#f2dede" : "#dff0d8",
                  padding: "8px",
                  borderRadius: "4px",
                  fontWeight: 600,
                }}
              >
                {message.text}
              </div>
            </div>
          )}

          <button type="submit" className="btn-cta" disabled={submitting} style={{ display: "block", width: "100%" }}>
            {submitting ? "Registrando..." : "Crear cuenta"}
          </button>

          <div className="register-footer">
            <div className="muted">¿Ya tienes cuenta?</div>
            <button type="button" className="register-register" onClick={() => navigate("/login")}>
              Iniciar sesión
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}