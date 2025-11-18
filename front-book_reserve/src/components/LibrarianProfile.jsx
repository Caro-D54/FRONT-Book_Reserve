import { useAuth } from "../context/AuthContext";

export default function LibrarianProfile() {
    const { user } = useAuth();

    if (!user?.is_staff) {
        return <p>No tienes permisos para ver este panel.</p>;
    }
    return (
        <div>
            <h1>Panel del Bibliotecario</h1>
            <p>Bienvenido {user.username}</p>
        </div>
    );
}