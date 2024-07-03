import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/usuarios`);

                if (response.data && typeof response.data === 'string' && response.data === 'PRO FEATURE ONLY') {
                    setError('Esta función está disponible solo para usuarios premium.');
                } else if (Array.isArray(response.data)) {
                    setUsuarios(response.data);
                } else {
                    setError('La respuesta de la API no es válida');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
                setError('Error al obtener usuarios. Por favor, intenta nuevamente.');
                setLoading(false);
            }
        };

        obtenerUsuarios();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Lista de Usuarios Registrados</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaUsuarios;
