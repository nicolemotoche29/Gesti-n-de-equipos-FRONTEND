import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MantenimientoPg = () => {
    const [mantenimientos, setMantenimientos] = useState([]);
    const [nuevoMantenimiento, setNuevoMantenimiento] = useState({
        ul_fecha_man_in: '',
        prox_fecha_man_in: '',
        ul_fecha_man_ex: '',
        prox_fecha_man_ex: '',
        id_equipo: '',
        comentario: ''
    });

    useEffect(() => {
        obtenerMantenimientos();
    }, []);

    const obtenerMantenimientos = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/mantenimientos`);
            setMantenimientos(response.data);
        } catch (error) {
            console.error('Error al obtener los mantenimientos:', error);
        }
    };

    const crearNuevoMantenimiento = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/mantenimientos`, nuevoMantenimiento);
            console.log('Nuevo mantenimiento creado:', response.data);
            obtenerMantenimientos();
            setNuevoMantenimiento({
                ul_fecha_man_in: '',
                prox_fecha_man_in: '',
                ul_fecha_man_ex: '',
                prox_fecha_man_ex: '',
                id_equipo: '',
                comentario: ''
            });
        } catch (error) {
            console.error('Error al crear el nuevo mantenimiento:', error);
        }
    };

    const actualizarMantenimiento = async (id_equipo) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/mantenimientos/${id_equipo}`, nuevoMantenimiento, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Mantenimiento actualizado:', response.data);
            obtenerMantenimientos();
        } catch (error) {
            console.error('Error al actualizar el mantenimiento:', error);
        }
    };

    const eliminarMantenimiento = async (id_equipo) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/mantenimientos/${id_equipo}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Mantenimiento eliminado:', response.data);
            obtenerMantenimientos();
        } catch (error) {
            console.error('Error al eliminar el mantenimiento:', error);
        }
    };

    const handleChange = (e) => {
        setNuevoMantenimiento({
            ...nuevoMantenimiento,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h1>Mantenimientos</h1>

            {/* Formulario para crear un nuevo mantenimiento */}
            <form onSubmit={crearNuevoMantenimiento}>
                <input
                    type="text"
                    name="id_equipo"
                    value={nuevoMantenimiento.id_equipo}
                    onChange={handleChange}
                    placeholder="ID de Equipo"
                    required
                />
                <input
                    type="date"
                    name="ul_fecha_man_in"
                    value={nuevoMantenimiento.ul_fecha_man_in}
                    onChange={handleChange}
                    placeholder="Última fecha de mantenimiento interno"
                    required
                />
                <input
                    type="date"
                    name="prox_fecha_man_in"
                    value={nuevoMantenimiento.prox_fecha_man_in}
                    onChange={handleChange}
                    placeholder="Próxima fecha de mantenimiento interno"
                    required
                />
                <input
                    type="date"
                    name="ul_fecha_man_ex"
                    value={nuevoMantenimiento.ul_fecha_man_ex}
                    onChange={handleChange}
                    placeholder="Última fecha de mantenimiento externo"
                    required
                />
                <input
                    type="date"
                    name="prox_fecha_man_ex"
                    value={nuevoMantenimiento.prox_fecha_man_ex}
                    onChange={handleChange}
                    placeholder="Próxima fecha de mantenimiento externo"
                    required
                />
                <input
                    type="text"
                    name="comentario"
                    value={nuevoMantenimiento.comentario}
                    onChange={handleChange}
                    placeholder="Comentario"
                />
                <button type="submit">Crear Mantenimiento</button>
            </form>

            {/* Lista de mantenimientos */}
            <ul>
                {mantenimientos.map((mantenimiento) => (
                    <li key={mantenimiento.id_equipo}>
                        <p>ID: {mantenimiento.id_equipo}</p>
                        <p>Última fecha mantenimiento interno: {mantenimiento.ul_fecha_man_in}</p>
                        <p>Próxima fecha mantenimiento interno: {mantenimiento.prox_fecha_man_in}</p>
                        <p>Última fecha mantenimiento externo: {mantenimiento.ul_fecha_man_ex}</p>
                        <p>Próxima fecha mantenimiento externo: {mantenimiento.prox_fecha_man_ex}</p>
                        <p>Comentario: {mantenimiento.comentario}</p>
                        {/* Botones para actualizar y eliminar */}
                        <button onClick={() => actualizarMantenimiento(mantenimiento.id_equipo)}>Actualizar</button>
                        <button onClick={() => eliminarMantenimiento(mantenimiento.id_equipo)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MantenimientoPg;
