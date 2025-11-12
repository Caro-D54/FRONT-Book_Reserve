import React, { useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Library.css";

/* Importa tus 5 avatars locales (ajusta rutas según tu proyecto) */
import avatar1 from "../assets/basic_avatar.png";
import avatar2 from "../assets/fantasy_avatar.png";
import avatar3 from "../assets/scifi_avatar.png";
import avatar4 from "../assets/history_avatar.png";
import avatar5 from "../assets/mistery_avatar.png";
import avatar6 from "../assets/romance_avatar.png";
import avatar7 from "../assets/girl_avatar.png";
import avatar8 from "../assets/man_avatar.png";
import avatar9 from "../assets/general_avatar.png";

ChartJS.register(ArcElement, Tooltip, Legend);

const STORAGE_KEY = "app_profile_v2";

const AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9];

const DEFAULT_STATE = {
  user: {
    id: 1,
    name: "user",
    email: "user@ejemplo.com",
    avatar: AVATARS[0],
  },
  solicitudes: [
    { id: "r1", title: "Cien Años de Soledad", status: "Aprobada", createdAt: "2024-03-02" },
    { id: "r2", title: "1984", status: "Pendiente", createdAt: "2024-05-04" },
    { id: "r3", title: "El Quijote", status: "Rechazada", createdAt: "2024-01-12" },
  ],
  favoritos: [
    { id: 101, title: "Cien Años de Soledad", author: "Gabriel García Márquez", year: 1967, genre: "Ficción", cover: null },
    { id: 102, title: "1984", author: "George Orwell", year: 1949, genre: "Ciencia Ficción", cover: null },
  ],
  historial: [
    { id: 201, title: "Cien Años de Soledad", genre: "Ficción", minutes: 630, date: "2024-03-02" },
    { id: 202, title: "1984", genre: "Ciencia Ficción", minutes: 480, date: "2023-12-24" },
    { id: 203, title: "El Gran Gatsby", genre: "Drama", minutes: 312, date: "2023-10-09" },
  ],
};

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
};
const saveState = (s) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {}
};

export default function Profile({ user: userProp = null, onNavigate = () => {} }) {
  const [state, setState] = useState(() => loadState());
  const user = userProp || state.user;

  const [section, setSection] = useState("Solicitudes");
  const [solFilter, setSolFilter] = useState("Todas");

  const [nameEdit, setNameEdit] = useState(user?.name || "");
  const [emailEdit, setEmailEdit] = useState(user?.email || "");
  const [pendingAvatar, setPendingAvatar] = useState(user?.avatar || AVATARS[0]);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passMsg, setPassMsg] = useState(null);

  useEffect(() => saveState(state), [state]);

  useEffect(() => {
    // keep form fields in sync when user data changes externally
    setNameEdit(state.user?.name || "");
    setEmailEdit(state.user?.email || "");
    setPendingAvatar(state.user?.avatar || AVATARS[0]);
  }, [state.user]);

  const solicitudesFiltered = useMemo(() => {
    if (solFilter === "Todas") return state.solicitudes;
    return state.solicitudes.filter((s) => s.status.toLowerCase() === solFilter.toLowerCase());
  }, [state.solicitudes, solFilter]);

  const toggleFavorite = (book) => {
    setState((prev) => {
      const exists = prev.favoritos.some((f) => f.id === book.id);
      const favoritos = exists ? prev.favoritos.filter((f) => f.id !== book.id) : [...prev.favoritos, book];
      return { ...prev, favoritos };
    });
  };

  const totalBooks = state.historial.length;
  const totalMinutes = state.historial.reduce((s, h) => s + (h.minutes || 0), 0);
  const avgMinutes = totalBooks ? Math.round(totalMinutes / totalBooks) : 0;
  const fmtMinutes = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  const genreCounts = useMemo(() => {
    const map = {};
    state.historial.forEach((h) => {
      const g = h.genre || "Sin género";
      map[g] = (map[g] || 0) + 1;
    });
    return map;
  }, [state.historial]);

  const doughnutData = useMemo(() => {
    const labels = Object.keys(genreCounts);
    const data = labels.map((l) => genreCounts[l]);
    const palette = ["#f6c85f", "#4e79a7", "#59a14f", "#e15759", "#edc949", "#b07aa1", "#ff9da7"];
    return { labels, datasets: [{ data, backgroundColor: palette.slice(0, labels.length), borderWidth: 0 }] };
  }, [genreCounts]);

  const updateSolicitudStatus = (id, status) => {
    setState((prev) => ({
      ...prev,
      solicitudes: prev.solicitudes.map((s) => (s.id === id ? { ...s, status } : s)),
    }));
  };

  const saveProfile = () => {
    if (!nameEdit.trim() || !emailEdit.trim()) {
      alert("Nombre y correo obligatorios");
      return;
    }
    setState((prev) => ({
      ...prev,
      user: { ...prev.user, name: nameEdit.trim(), email: emailEdit.trim(), avatar: pendingAvatar },
    }));
    setPassMsg(null);
    alert("Perfil guardado");
  };

  const changePassword = () => {
    setPassMsg(null);
    if (!currentPassword) return setPassMsg({ type: "error", text: "Contraseña actual requerida" });
    if (!newPassword || !confirmPassword) return setPassMsg({ type: "error", text: "Rellena nueva contraseña y confirmación" });
    if (newPassword !== confirmPassword) return setPassMsg({ type: "error", text: "Las contraseñas no coinciden" });
    if (newPassword.length < 6) return setPassMsg({ type: "error", text: "Mínimo 6 caracteres" });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPassMsg({ type: "success", text: "Contraseña actualizada (simulado)" });
  };

  if (!user) {
    return (
      <section className="profile py-5">
        <div className="container">
          <div className="card">
            <h3>Acceso requerido</h3>
            <p>Por favor inicia sesión para ver tu perfil.</p>
            <button className="btn btn-primary" onClick={() => onNavigate("login")}>
              Iniciar sesión
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <main className="profile-page nexus">
      <div className="profile-container">
        <aside className="profile-sidebar card">
          <div className="sidebar-user">
            <img src={state.user?.avatar || AVATARS[0]} alt="avatar" className="sidebar-avatar" />
            <div>
              <div className="sidebar-name">{state.user?.name}</div>
              <div className="sidebar-email text-muted">{state.user?.email}</div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {["Solicitudes", "Favoritos", "Historial", "Configuración"].map((s) => (
              <button key={s} className={`nav-btn ${section === s ? "active" : ""}`} onClick={() => setSection(s)}>
                {s}
              </button>
            ))}
          </nav>
        </aside>

        <section className="profile-content">
          <header className="content-header">
            <h1>Mi perfil</h1>
            <div className="section-tabs">
              {["Solicitudes", "Favoritos", "Historial", "Configuración"].map((s) => (
                <button key={s} className={`mini-tab ${section === s ? "active" : ""}`} onClick={() => setSection(s)}>
                  {s}
                </button>
              ))}
            </div>
          </header>

          <div className="content-body">
            {section === "Solicitudes" && (
              <div className="panel card">
                <h2>Solicitudes</h2>
                <div className="tabs">
                  {["Todas", "Pendientes", "Aprobadas", "Rechazadas"].map((t) => (
                    <button key={t} className={`tab ${solFilter === t ? "active" : ""}`} onClick={() => setSolFilter(t)}>
                      {t}
                    </button>
                  ))}
                </div>

                <div className="table-wrap">
                  <table className="sol-table">
                    <thead>
                      <tr>
                        <th>Título</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {solicitudesFiltered.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-muted">
                            No hay solicitudes
                          </td>
                        </tr>
                      )}
                      {solicitudesFiltered.map((s) => (
                        <tr key={s.id}>
                          <td>{s.title}</td>
                          <td>
                            <span className={`badge estado-${s.status.toLowerCase()}`}>{s.status}</span>
                          </td>
                          <td>{s.createdAt}</td>
                          <td className="actions">
                            {s.status.toLowerCase() === "pendiente" && (
                              <>
                                <button className="btn btn-sm btn-accept" onClick={() => updateSolicitudStatus(s.id, "Aprobada")}>
                                  Aprobar
                                </button>
                                <button className="btn btn-sm btn-reject" onClick={() => updateSolicitudStatus(s.id, "Rechazada")}>
                                  Rechazar
                                </button>
                              </>
                            )}
                            <button className="btn btn-sm btn-muted" onClick={() => alert(JSON.stringify(s, null, 2))}>
                              Ver
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {section === "Favoritos" && (
              <div className="panel card">
                <h2>Favoritos</h2>
                <div className="fav-grid">
                  {state.favoritos.length === 0 && <div className="text-muted">No tienes favoritos</div>}
                  {state.favoritos.map((b) => (
                    <article className="fav-card" key={b.id}>
                      <div className="fav-thumb">{b.cover ? <img src={b.cover} alt={b.title} /> : <div className="cover-placeholder">📚</div>}</div>
                      <div className="fav-body">
                        <div className="fav-title">{b.title}</div>
                        <div className="fav-author text-muted">
                          {b.author}
                          {b.year ? ` - ${b.year}` : ""}
                        </div>
                        <div className="fav-genre text-muted small">Género: {b.genre || "—"}</div>
                        <div style={{ marginTop: "auto" }} className="fav-actions">
                          <button className="btn btn-outline btn-sm" onClick={() => toggleFavorite(b)}>
                            Quitar
                          </button>
                          <button className="btn btn-primary btn-sm" onClick={() => alert(`${b.title}\n${b.author}`)}>
                            Detalles
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {section === "Historial" && (
              <div className="panel">
                <h2>Historial de lectura</h2>
                <div className="hist-top grid-2">
                  <div className="chart-wrap card">
                    <h3>Géneros leídos</h3>
                    <div style={{ height: 220 }}>
                      <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }} />
                    </div>
                  </div>

                  <div className="stats-wrap card">
                    <h3>Estadísticas</h3>
                    <div className="stat">
                      <div className="stat-label">Total de libros</div>
                      <div className="stat-value">{totalBooks}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-label">Tiempo total</div>
                      <div className="stat-value">{fmtMinutes(totalMinutes)}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-label">Promedio por libro</div>
                      <div className="stat-value">{fmtMinutes(avgMinutes)}</div>
                    </div>
                  </div>
                </div>

                <div className="table-wrap mt-3 card">
                  <table className="hist-table">
                    <thead>
                      <tr>
                        <th>Libro</th>
                        <th>Género</th>
                        <th>Tiempo</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.historial.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-muted">
                            Sin historial
                          </td>
                        </tr>
                      )}
                      {state.historial.map((h) => (
                        <tr key={h.id}>
                          <td>{h.title}</td>
                          <td>{h.genre}</td>
                          <td>{fmtMinutes(h.minutes)}</td>
                          <td>{h.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {section === "Configuración" && (
              <div className="panel card">
                <h2>Configuración</h2>
                <div className="config-grid">
                  <div className="card">
                    <h3>Avatar</h3>
                    <div className="avatar-options">
                      {AVATARS.map((a, i) => (
                        <button
                          key={a}
                          className={`avatar-choice ${pendingAvatar === a ? "selected" : ""}`}
                          onClick={() => setPendingAvatar(a)}
                          aria-label={`Avatar ${i + 1}`}
                        >
                          <img src={a} alt={`avatar ${i + 1}`} />
                        </button>
                      ))}
                    </div>

                    <div style={{ marginTop: 12 }}>
                      <img src={pendingAvatar} alt="selected avatar" style={{ width: 72, height: 72, borderRadius: 8 }} />
                    </div>
                  </div>

                  <div className="card">
                    <h3>Información</h3>
                    <label className="form-label">Nombre</label>
                    <input className="form-input" value={nameEdit} onChange={(e) => setNameEdit(e.target.value)} />
                    <label className="form-label mt-2">Correo</label>
                    <input className="form-input" value={emailEdit} onChange={(e) => setEmailEdit(e.target.value)} />
                    <div style={{ marginTop: 12 }}>
                      <button className="btn btn-primary" onClick={saveProfile}>
                        Guardar cambios
                      </button>
                    </div>
                  </div>

                  <div className="card fullwidth">
                    <h3>Cambiar contraseña</h3>
                    <label className="form-label">Contraseña actual</label>
                    <input className="form-input" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    <label className="form-label mt-2">Nueva contraseña</label>
                    <input className="form-input" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <label className="form-label mt-2">Confirmar nueva contraseña</label>
                    <input className="form-input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    {passMsg && <div className={`password-msg ${passMsg.type}`}>{passMsg.text}</div>}
                    <div style={{ marginTop: 12 }}>
                      <button className="btn btn-primary" onClick={changePassword}>
                        Actualizar contraseña
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}