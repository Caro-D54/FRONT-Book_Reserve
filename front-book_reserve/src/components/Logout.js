import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refresh = localStorage.getItem("refresh_token");
    const access = localStorage.getItem("access_token");

    try {
      if (refresh) {
        // Llamada al backend para invalidar el refresh token
        await axiosInstance.post(
          "/users_management/logout/",
          { refresh },
          {
            headers: { Authorization: `Bearer ${access}` },
          }
        );
      }
    } catch (err) {
      // Si falla, igual limpiamos tokens en frontend
      console.error("Error al cerrar sesión en backend:", err);
    } finally {
      // Limpiar tokens y datos en frontend
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");

      // Redirigir al login
      navigate("/login");
    }
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
};

export default Logout;
