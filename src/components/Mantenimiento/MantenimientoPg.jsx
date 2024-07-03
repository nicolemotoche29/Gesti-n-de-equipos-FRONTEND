import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MantenimientoPg = () => {
    const [mantenimientos, setMantenimientos] = useState([]);
    const [nuevoMantenimiento, setNuevoMantenimiento] = useState({
        // Define aquí los campos necesarios para crear un nuevo mantenimiento
        // Ejemplo: id_equipo: '',
        //         tipo_mantenimiento: '',
        //         fecha: '',
        //         etc.
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

    const crearNuevoMantenimiento = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/mantenimientos`, nuevoMantenimiento);
            console.log('Nuevo mantenimiento creado:', response.data);
            // Puedes actualizar la lista de mantenimientos aquí si es necesario
            obtenerMantenimientos();
        } catch (error) {
            console.error('Error al crear el nuevo mantenimiento:', error);
        }
    };

    const actualizarMantenimiento = async (id_equipo) => {
        // Implementa la lógica para actualizar un mantenimiento específico
    };

    const eliminarMantenimiento = async (id_equipo) => {
        // Implementa la lógica para eliminar un mantenimiento específico
    };

    return (
        <div>
            <h1>Mantenimientos</h1>

            {/* Formulario para crear un nuevo mantenimiento */}
            <form onSubmit={crearNuevoMantenimiento}>
                {/* Campos del formulario para crear un nuevo mantenimiento */}
                {/* Ejemplo: */}
                {/* <input type="text" value={nuevoMantenimiento.tipo_mantenimiento} onChange={(e) => setNuevoMantenimiento({ ...nuevoMantenimiento, tipo_mantenimiento: e.target.value })} /> */}
                {/* Otros campos necesarios */}
                <button type="submit">Crear Mantenimiento</button>
            </form>

            {/* Lista de mantenimientos */}
            <ul>
                {mantenimientos.map((mantenimiento) => (
                    <li key={mantenimiento.id_equipo}>
                        {/* Mostrar detalles del mantenimiento */}
                        {/* Ejemplo: */}
                        {/* <p>{mantenimiento.tipo_mantenimiento} - {mantenimiento.fecha}</p> */}
                        {/* Botones para actualizar y eliminar */}
                        {/* <button onClick={() => actualizarMantenimiento(mantenimiento.id_equipo)}>Actualizar</button> */}
                        {/* <button onClick={() => eliminarMantenimiento(mantenimiento.id_equipo)}>Eliminar</button> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MantenimientoPg;
