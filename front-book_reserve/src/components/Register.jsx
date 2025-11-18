import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Register({ onRegister = null }) {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Validaciones
    if (!name.trim()) return setMessage({ type: "error", text: "El nombre es obligatorio." });
    if (!mail.trim() || !validateEmail(mail)) return setMessage({ type: "error", text: "Introduce un correo válido." });
    if (password.length < 6) return setMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres." });
    if (password !== confirm) return setMessage({ type: "error", text: "Las contraseñas no coinciden." });

    setSubmitting(true);

    try {
      // Llamada al backend
      const response = await axiosInstance.post("/users_management/register/", {
        mail,
        name,
        password,
      });

      // Guardar tokens y perfil
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("user", JSON.stringify(response.data));

      setMessage({ type: "success", text: "Registro completado. Bienvenido." });

      // Callback opcional
      if (typeof onRegister === "function") {
        onRegister(response.data);
      }

      // Redirigir según rol
      if (response.data.is_staff || response.data.is_superuser) {
        navigate("/admin/profile");
      } else {
        navigate("/profile");
      }

      // Reset form
      setName("");
      setMail("");
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
      <section className="register-panel" aria-labelledby="register-title">
        <h1 id="register-title" className="register-title">Crear cuenta</h1>

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="form-label" htmlFor="r-name">Nombre</label>
            <input id="r-name" className="register-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" required />
          </div>

          <div>
            <label className="form-label" htmlFor="r-mail">Correo electrónico</label>
            <input id="r-mail" className="register-input" type="email" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="tu@correo.com" required />
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

          <button type="submit" className="btn-cta" disabled={submitting}>
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
