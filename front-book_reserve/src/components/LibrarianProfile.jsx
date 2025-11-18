import { useAuth } from "../context/AuthContext";

export default function LibrarianProfile() {
    const { user } = useAuth();

    if ((!user?.is_staff) || (!user?.is_superuser)) {
        return <p>No tienes permisos para ver este panel.</p>;
    }
    return (
        <div>
            <h1>Panel del Bibliotecario</h1>
            <p>Bienvenido {user.username}</p>
            <ul>
                <li><button onClick={() => alert("Gestionar libros")}>Gestionar Libros</button></li>
                <li><button onClick={() => alert("Gestionar sucursales")}>Gestionar Sucursales</button></li>
                <li><button onClick={() => alert("Aprobar/Rechazar solicitudes")}>Solicitudes</button></li>
            </ul>
        </div>
    );
}