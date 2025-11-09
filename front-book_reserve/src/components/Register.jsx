import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";
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
    setFormData((p) => ({ ...p, [name]: value }));
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
    <div className="register-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body" p-4>
                <header className="mb-3 text-center">
                  <h1 className="h5 mb-1">
                    Crear Cuenta
                  </h1>
                  <p className="text-muted small mb-0">
                    Únete a Nexus Literario
                  </p>
                </header>
                {error && (
                  <div className="alert alert-danger" role="alert" aria-live="assertive">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre Completo
                    </label>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Tu Nombre Completo"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    autoComplete="name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo Electrónico
                    </label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    autoComplete="email"
                    aria-required="true"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    autoComplete="new-password"
                    aria-required="true"
                    minLength={6}
                    />
                    <div className="form-text">
                      La contraseña debe tener al menos 6 caracteres
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirmar Contraseña
                      </label>
                      <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="form-control"
                      placeholder="Repite tu contraseña"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      autoComplete="new-password"
                      aria-required="true"
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        aria-busy={loading}
                        >
                          {loading ? (
                            <>
                            <i className="fas fa-spinner fa-spin me-2" aria-hidden="true"></i>
                            Creando cuenta...
                            </>
                          ) : (
                            <>
                            <i className="fas fa-user-plus me-2" aria-hidden="true"></i>
                            Crear Cuenta
                            </>
                          )}
                        </button>
                    </div>
                  </div>
                </form>
                <footer className="mt-3 text-center">
                  <small className="text-muted">
                    ¿Ya tienes una cuenta?{" "}
                    <button
                      type="button"
                      className="btn btn-link p-0 align-baseline"
                      onClick={() => typeof onSwitchToLogin === 'function' && onSwitchToLogin}
                      disabled={loading}
                      >
                        Inicia sesión aquí
                    </button>
                  </small>
                </footer>
              </div>
            </div>
            <div className="text-center text-muted small mt-3">
              Al registrarte aceptas terminos y condiciones
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  onRegister: PropTypes.func,
  onSwitchToLogin: PropTypes.func,
};

export default Register;