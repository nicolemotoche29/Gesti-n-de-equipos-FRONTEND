// src/components/Administrador/PerfilAdmin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PerfilAdmin = () => {
    const [perfil, setPerfil] = useState({});
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/perfil`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setPerfil(response.data);
            } catch (error) {
                console.error("Error en la solicitud:", error);
                setMensaje("Error al obtener el perfil");
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/usuario/${perfil.id}`, perfil, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMensaje("Perfil actualizado correctamente");
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setMensaje("Error al actualizar el perfil");
        }
    };

    const handleChange = (e) => {
        setPerfil({
            ...perfil,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h2>Perfil del Administrador</h2>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input type="text" name="nombre" value={perfil.nombre || ''} onChange={handleChange} />
                </div>
                <div>
                    <label>Apellido</label>
                    <input type="text" name="apellido" value={perfil.apellido || ''} onChange={handleChange} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={perfil.email || ''} onChange={handleChange} />
                </div>
                <button type="submit">Actualizar Perfil</button>
            </form>
        </div>
    );
};

export default PerfilAdmin;
