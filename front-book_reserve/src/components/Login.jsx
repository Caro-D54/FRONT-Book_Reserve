import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Library.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    //const success = await login(email, password)

    if (!email || !password) {
      setError('Por favor completa correo y contraseña.');
      return;
    }

    try {
      await login(email, password);
      navigate('/profile'); // redirige al perfil tras login exitoso
    } catch (err) {
      console.error(err);
      const backendMessage =
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        'Credenciales inválidas o error de red.';
      setError(backendMessage);
    }
  };

  return (
    <main className="login-page">
      <div className="login-backdrop" />

      <div
        className="login-panel"
        role="dialog"
        aria-labelledby="login-title"
        aria-modal="true"
      >
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
              type={showPassword ? 'text' : 'password'}
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
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? 'Ocultar' : 'Ver'}
            </button>
          </div>

          <button type="submit" className="btn btn-cta login-submit">Iniciar Sesión</button>

          {error && (
            <p className="form-error" style={{ color: 'red', marginTop: '0.5rem' }}>
              {error}
            </p>
          )}

          <div className="login-footer">
            <span className="muted">¿No tienes una cuenta?</span>
            <button
              type="button"
              className="btn btn-link login-register"
              onClick={() => navigate('/register')}
            >
              Regístrate
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}