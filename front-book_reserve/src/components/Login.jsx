import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./Library.css";

const Login = ({ onLogin = () => {}, onNavigate = () => {} }) => {
  const auth = useAuth();
  const login = auth?.login ?? (async (email) => ({ name: "Demo", email }));
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mountedRef = useRef(true);

  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; }; }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError(""); setLoading(true);
    try {
      const user = await login(form.email.trim(), form.password);
      if (user && typeof onLogin === "function") onLogin(user);
    } catch (err) {
      if (mountedRef.current) setError(err?.message || "Error al iniciar sesión.");
    } finally { if (mountedRef.current) setLoading(false); }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h5">Iniciar Sesión</h1>
              <p className="text-muted small">Accede a tu cuenta</p>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo electrónico</label>
                  <input id="email" name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required autoComplete="email" />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input id="password" name="password" type="password" className="form-control" value={form.password} onChange={handleChange} required autoComplete="current-password" />
                </div>

                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
                </div>
              </form>

              <div className="mt-3 text-center">
                <small className="text-muted">¿No tienes cuenta? <button className="btn btn-link p-0" onClick={() => onNavigate("register")}>Regístrate</button></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;