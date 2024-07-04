import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EquiposPg = () => {
    const [equipos, setEquipos] = useState([]);
    const [nuevoEquipo, setNuevoEquipo] = useState({
        idcod: '',
        descripcion: '',
        marca: '',
        modelos: '',
        nserie: '',
        accesorios: '',
        fabricante: '',
        caracteristicas: '',
        con_instalacion: '',
        con_utilizacion: '',
        area: '',
        idsupus: null
    });

    useEffect(() => {
        obtenerEquipos();
    }, []);

    const obtenerEquipos = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/equipos`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEquipos(response.data);
        } catch (error) {
            console.error('Error al obtener los equipos:', error);
        }
    };

    const crearNuevoEquipo = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/equipos`, nuevoEquipo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Nuevo equipo creado:', response.data);
            // Actualizar la lista de equipos después de crear uno nuevo
            obtenerEquipos();
            // Limpiar el formulario después de la creación
            setNuevoEquipo({
                idcod: '',
                descripcion: '',
                marca: '',
                modelos: '',
                nserie: '',
                accesorios: '',
                fabricante: '',
                caracteristicas: '',
                con_instalacion: '',
                con_utilizacion: '',
                area: 'ÁREA 6',
                idsupus: null
            });
        } catch (error) {
            console.error('Error al crear el nuevo equipo:', error);
        }
    };

    const actualizarEquipo = async (id) => {
        // Implementa la lógica para actualizar un equipo específico
    };

    const eliminarEquipo = async (id) => {
        // Implementa la lógica para eliminar un equipo específico
    };

    const handleChange = (e) => {
        setNuevoEquipo({
            ...nuevoEquipo,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h1>Equipos</h1>

            {/* Formulario para crear un nuevo equipo */}
            <form onSubmit={crearNuevoEquipo}>
                <input
                    type="text"
                    name="idcod"
                    value={nuevoEquipo.idcod}
                    onChange={handleChange}
                    placeholder="Código ID"
                    required
                />
                <input
                    type="text"
                    name="descripcion"
                    value={nuevoEquipo.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción"
                    required
                />
                <input
                    type="text"
                    name="marca"
                    value={nuevoEquipo.marca}
                    onChange={handleChange}
                    placeholder="Marca"
                    required
                />
                {/* Agrega los demás campos necesarios para el nuevo equipo */}
                <button type="submit">Crear Equipo</button>
            </form>

            {/* Lista de equipos */}
            <ul>
                {equipos.map((equipo) => (
                    <li key={equipo.id}>
                        <p>{equipo.idcod} - {equipo.descripcion}</p>
                        {/* Botones para actualizar y eliminar */}
                        <button onClick={() => actualizarEquipo(equipo.id)}>Actualizar</button>
                        <button onClick={() => eliminarEquipo(equipo.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EquiposPg;
