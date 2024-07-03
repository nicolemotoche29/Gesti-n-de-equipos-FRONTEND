import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EquiposPg = () => {
    const [equipos, setEquipos] = useState([]);
    const [nuevoEquipo, setNuevoEquipo] = useState({
        // Define aquí los campos necesarios para crear un nuevo equipo
        // Ejemplo: id: '',
        //         nombre: '',
        //         descripcion: '',
        //         etc.
    });

    useEffect(() => {
        obtenerEquipos();
    }, []);

    const obtenerEquipos = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/equipos`);
            setEquipos(response.data);
        } catch (error) {
            console.error('Error al obtener los equipos:', error);
        }
    };

    const crearNuevoEquipo = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/equipos`, nuevoEquipo);
            console.log('Nuevo equipo creado:', response.data);
            // Puedes actualizar la lista de equipos aquí si es necesario
            obtenerEquipos();
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

    return (
        <div>
            <h1>Equipos</h1>

            {/* Formulario para crear un nuevo equipo */}
            <form onSubmit={crearNuevoEquipo}>
                {/* Campos del formulario para crear un nuevo equipo */}
                {/* Ejemplo: */}
                {/* <input type="text" value={nuevoEquipo.nombre} onChange={(e) => setNuevoEquipo({ ...nuevoEquipo, nombre: e.target.value })} /> */}
                {/* Otros campos necesarios */}
                <button type="submit">Crear Equipo</button>
            </form>

            {/* Lista de equipos */}
            <ul>
                {equipos.map((equipo) => (
                    <li key={equipo.id}>
                        {/* Mostrar detalles del equipo */}
                        {/* Ejemplo: */}
                        {/* <p>{equipo.nombre} - {equipo.descripcion}</p> */}
                        {/* Botones para actualizar y eliminar */}
                        {/* <button onClick={() => actualizarEquipo(equipo.id)}>Actualizar</button> */}
                        {/* <button onClick={() => eliminarEquipo(equipo.id)}>Eliminar</button> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EquiposPg;
