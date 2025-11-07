import React, { useState } from "react";

const Login = ({ onLogin = () => {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (submitting) return;

    const cleanedEmail = (email || "").trim();
    if (!cleanedEmail) {
      setError("Introduce un correo válido.");
      return;
    }

    setError("");
    setSubmitting(true);

    // Simulación simple de login para TP8: crear objeto user
    try {
      const user = { name: cleanedEmail.split("@")[0], email: cleanedEmail };
      // Llamada segura al callback del padre
      if (typeof onLogin === "function") onLogin(user);
    } catch (err) {
      setError("Error al iniciar sesión.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h3 className="mb-3">Iniciar sesión</h3>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={submit} noValidate>
              <div className="mb-3">
                <label htmlFor="login-email" className="form-label">
                  Correo electrónico
                </label>
                <input
                  id="login-email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Correo electrónico"
                  required
                  disabled={submitting}
                  autoComplete="email"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="login-password" className="form-label">
                  Contraseña
                </label>
                <input
                  id="login-password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Contraseña"
                  required
                  disabled={submitting}
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={submitting}
                aria-busy={submitting}
              >
                {submitting ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;