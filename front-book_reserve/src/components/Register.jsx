import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./Register.css";

const Register = ({ onRegister = () => {}, onSwitchToLogin = () => {} }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const email = (formData.email || "").trim();
    const pwd = formData.password || "";
    const confirm = formData.confirmPassword || "";
    if (!email) return "El correo electrónico es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Introduce un correo electrónico válido.";
    if (pwd.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    if (pwd !== confirm) return "Las contraseñas no coinciden.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Llamada al register real del AuthContext
      const user = await register(
        formData.name.trim(),
        formData.email.trim(),
        formData.password,
        formData.confirmPassword
      );

      // register (según tu AuthContext) resuelve con userData; notificamos al padre
      if (user && typeof onRegister === "function") {
        onRegister(user);
      }
    } catch (err) {
      const message = err?.message || "Error al crear la cuenta.";
      if (mountedRef.current) setError(message);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-background">
        <div className="register-content">
          <div className="register-card" role="region" aria-label="Registro">
            <div className="register-header">
              <i className="fas fa-user-plus" aria-hidden="true"></i>
              <h1>Crear Cuenta</h1>
              <p>Únete a Nexus Literario</p>
            </div>

            {error && (
              <div className="error-message" role="alert" aria-live="assertive">
                <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="register-form" noValidate>
              <div className="form-group">
                <label htmlFor="name">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  disabled={loading}
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  disabled={loading}
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  required
                  disabled={loading}
                  autoComplete="new-password"
                />
                <small>La contraseña debe tener al menos 6 caracteres</small>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                  required
                  disabled={loading}
                  autoComplete="new-password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary register-btn"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
                    Crear cuenta...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus" aria-hidden="true"></i>
                    Crear Cuenta
                  </>
                )}
              </button>
            </form>

            <div className="register-footer">
              <p>¿Ya tienes una cuenta?</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => typeof onSwitchToLogin === "function" && onSwitchToLogin()}
                disabled={loading}
              >
                Inicia sesión aquí
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;