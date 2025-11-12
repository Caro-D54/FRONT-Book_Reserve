import React, { useState } from "react";

/*
  Register.jsx
  - Usa las clases de Library.css que compartiste (.nexus .register-page, .register-panel, .btn-cta, etc.)
  - Validaciones básicas: nombre requerido, email válido, password min 6 chars, confirmación que coincide
  - Toggle para mostrar/ocultar contraseña
  - onRegister prop opcional: function(user) => void
  - Simula creación guardando en localStorage (key "app_registered_user") — reemplaza por llamada a API en producción
*/

export default function Register({ onRegister = null }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'error'|'success', text: string }

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Validations
    if (!name.trim()) return setMessage({ type: "error", text: "El nombre es obligatorio." });
    if (!username.trim()) return setMessage({ type: "error", text: "El nombre de usuario es obligatorio." });
    if (!email.trim() || !validateEmail(email)) return setMessage({ type: "error", text: "Introduce un correo válido." });
    if (password.length < 6) return setMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres." });
    if (password !== confirm) return setMessage({ type: "error", text: "Las contraseñas no coinciden." });

    setSubmitting(true);

    try {
      // Simulación de "registro": guarda usuario en localStorage (no almacenar contraseñas en producción)
      const user = { id: Date.now(), name: name.trim(), username: username.trim(), email: email.trim(), createdAt: new Date().toISOString() };
      try {
        localStorage.setItem("app_registered_user", JSON.stringify(user));
      } catch {}

      setMessage({ type: "success", text: "Registro completado. Bienvenido." });

      // Llamada de callback si la app la provee (p.ej. para redirigir al login o iniciar sesión)
      if (typeof onRegister === "function") {
        onRegister(user);
      }

      // Resetea formulario (opcional)
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirm("");
    } catch (err) {
      setMessage({ type: "error", text: "Error al registrar. Intenta de nuevo." });
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
          <div>
            <label className="form-label" htmlFor="r-name">Nombre</label>
            <input id="r-name" className="register-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" required />
          </div>

          <div>
            <label className="form-label" htmlFor="r-username">Nombre de usuario</label>
            <input id="r-username" className="register-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ej: demo_user" required />
          </div>

          <div>
            <label className="form-label" htmlFor="r-email">Correo electrónico</label>
            <input id="r-email" className="register-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" required />
          </div>

          <div>
            <label className="form-label" htmlFor="r-pass">Contraseña</label>
            <div className="password-row">
              <input
                id="r-pass"
                className="register-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                aria-describedby="r-pass-help"
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
            <div id="r-pass-help" className="muted" style={{ marginTop: 6, fontSize: 13 }}>
              La contraseña debe tener al menos 6 caracteres.
            </div>
          </div>

          <div>
            <label className="form-label" htmlFor="r-confirm">Confirmar contraseña</label>
            <input id="r-confirm" className="register-input" type={showPassword ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          </div>

          {message && (
            <div role="status" aria-live="polite" style={{ marginTop: 8 }}>
              <div style={{ color: message.type === "error" ? "#ffb4b4" : "#e6f7df", fontWeight: 600 }}>{message.text}</div>
            </div>
          )}

          <button type="submit" className="btn-cta" disabled={submitting} aria-disabled={submitting} style={{ display: "block", width: "100%" }}>
            {submitting ? "Registrando..." : "Crear cuenta"}
          </button>

          <div className="register-footer">
            <div className="muted">¿Ya tienes cuenta?</div>
            <button type="button" className="register-register" onClick={() => { if (typeof onRegister === "function") onRegister(null); }}>
              Iniciar sesión
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
