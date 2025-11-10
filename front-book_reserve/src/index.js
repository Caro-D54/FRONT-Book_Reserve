import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/bootstrap-override.css';
import { AuthProvider } from './context/AuthContext';
import './components/Library.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export {default as LibraryHero} from './components/LibraryHero';
export {default as BookList} from './components/BookList';
export {default as BookCard} from './components/BookCard';
export {default as Profile} from './components/Profile';
export {default as Recommendations} from './components/Recommendations';
export {default as Login} from './components/Login';
export {default as Register} from './components/Register';
export {default as Footer} from './components/Footer';
export {default as Header} from './components/Header';
export {default as Home} from './components/Home';