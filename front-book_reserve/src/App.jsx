import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import BookList from './components/BookList';
import Profile from './components/Profile';
import Recommendations from './components/Recommendations';

import Login from './components/Login';
import Register from './components/Register';

import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function AppShell() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="nexus d-flex flex-column min-vh-100">
      <Header
        user={user}
        onNavigate={(view) => {
          if (view === 'home') navigate('/');
          if (view === 'catalog') navigate('/catalog');
          if (view === 'profile') navigate('/profile');
        }}
        onLogout={async () => {
          await logout();
          navigate('/login');
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={<Home onNavigate={() => {}} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
          />

          <Route path="/catalog" element={<BookList user={user} searchQuery={searchQuery} />} />

          <Route path="/login" element={user ? <Navigate to="/profile" replace /> : <Login />} />

          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute redirectWhenUnauthorized />}>
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Route>

          <Route
            path="*"
            element={
              <div className="container py-5">
                <h2>Ruta no encontrada</h2>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AuthProvider>
  );
}