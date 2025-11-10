import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./Library.css";

const Register = ({ onRegister = () => {}, onNavigate = () => {} }) => {
  const auth = useAuth();
  const register = auth?.register ?? (async (name, email) => ({ name: name || "Usuario", email }));

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mountedRef = useRef(true);

  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; }; }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    const email = (form.email || "").trim();
    const pwd = form.password || "";
    const confirm = form.confirmPassword || "";
    if (!email) return "El correo electrónico es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Introduce un correo válido.";
    if (pwd.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    if (pwd !== confirm) return "Las contraseñas no coinciden.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const v = validate();
    if (v) { setError(v); return; }
    setError(""); setLoading(true);
    try {
      const user = await register(form.name.trim(), form.email.trim(), form.password, form.confirmPassword);
      if (user && typeof onRegister === "function") onRegister(user);
    } catch (err) {
      if (mountedRef.current) setError(err?.message || "Error al crear la cuenta.");
    } finally { if (mountedRef.current) setLoading(false); }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h5">Crear Cuenta</h1>
              <p className="text-muted small">Únete a Nexus Literario</p>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">Nombre completo</label>
                  <input id="name" name="name" className="form-control" value={form.name} onChange={handleChange} disabled={loading} autoComplete="name" />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">Correo electrónico</label>
                  <input id="email" name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required disabled={loading} autoComplete="email" />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">Contraseña</label>
                  <input id="password" name="password" type="password" className="form-control" value={form.password} onChange={handleChange} required disabled={loading} minLength={6} autoComplete="new-password" />
                  <div className="form-text">La contraseña debe tener al menos 6 caracteres</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="confirmPassword">Confirmar contraseña</label>
                  <input id="confirmPassword" name="confirmPassword" type="password" className="form-control" value={form.confirmPassword} onChange={handleChange} required disabled={loading} autoComplete="new-password" />
                </div>

                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Creando cuenta..." : "Crear cuenta"}</button>
                </div>
              </form>

              <div className="mt-3 text-center">
                <small className="text-muted">¿Ya tienes cuenta? <button className="btn btn-link p-0" onClick={() => onNavigate("login")}>Inicia sesión</button></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;