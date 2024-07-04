import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CalibracionEq = () => {
    const [calibraciones, setCalibraciones] = useState([]);
    const [nuevaCalibracion, setNuevaCalibracion] = useState({
        ul_fecha_cal_in: null,
        prox_fecha_cal_in: null,
        ul_fecha_cal_ex: null,
        prox_fecha_cal_ex: null,
        idcod_calibracion: '',
        comentarios: null
    });

    useEffect(() => {
        obtenerCalibraciones();
    }, []);

    const obtenerCalibraciones = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/calibraciones`);
            setCalibraciones(response.data);
        } catch (error) {
            console.error('Error al obtener las calibraciones:', error);
        }
    };

    const crearNuevaCalibracion = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/calibraciones`, nuevaCalibracion);
            console.log('Nueva calibración creada:', response.data);
            obtenerCalibraciones();
            setNuevaCalibracion({
                ul_fecha_cal_in: null,
                prox_fecha_cal_in: null,
                ul_fecha_cal_ex: null,
                prox_fecha_cal_ex: null,
                idcod_calibracion: '',
                comentarios: null
            });
        } catch (error) {
            console.error('Error al crear la nueva calibración:', error);
        }
    };

    const actualizarCalibracion = async (idcod_calibracion) => {
        // Implementa la lógica para actualizar una calibración específica
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/calibraciones/${idcod_calibracion}`, nuevaCalibracion, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Calibración actualizada:', response.data);
            obtenerCalibraciones();
        } catch (error) {
            console.error('Error al actualizar la calibración:', error);
        }
    };

    const eliminarCalibracion = async (idcod_calibracion) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/calibraciones/${idcod_calibracion}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Calibración eliminada:', response.data);
            obtenerCalibraciones();
        } catch (error) {
            console.error('Error al eliminar la calibración:', error);
        }
    };

    const handleChange = (e) => {
        setNuevaCalibracion({
            ...nuevaCalibracion,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h1>Calibraciones</h1>

            {/* Formulario para crear una nueva calibración */}
            <form onSubmit={crearNuevaCalibracion}>
                <input
                    type="text"
                    name="idcod_calibracion"
                    value={nuevaCalibracion.idcod_calibracion}
                    onChange={handleChange}
                    placeholder="ID de Calibración"
                    required
                />
                <input
                    type="text"
                    name="ul_fecha_cal_in"
                    value={nuevaCalibracion.ul_fecha_cal_in}
                    onChange={handleChange}
                    placeholder="Fecha-cal-in"
                    required
                />
                <input
                    type="text"
                    name="prox_fecha_cal_in"
                    value={nuevaCalibracion.prox_fecha_cal_in}
                    onChange={handleChange}
                    placeholder="Proxima fecha in"
                    required
                />
                <input
                    type="text"
                    name="ul_fecha_cal_ex"
                    value={nuevaCalibracion.ul_fecha_cal_ex}
                    onChange={handleChange}
                    placeholder="Ex fecha"
                    required
                />
                <input
                    type="text"
                    name="prox_fecha_cal_ex"
                    value={nuevaCalibracion.prox_fecha_cal_ex}
                    onChange={handleChange}
                    placeholder="Prox fecha ex"
                    required
                />
                <input
                    type="text"
                    name="comentarios"
                    value={nuevaCalibracion.comentarios}
                    onChange={handleChange}
                    placeholder="Comentarios"
                    required
                />
                <button type="submit">Crear Calibración</button>
            </form>

            {/* Lista de calibraciones */}
            <ul>
                {calibraciones.map((calibracion) => (
                    <li key={calibracion.idcod_calibracion}>
                        <p>ID: {calibracion.idcod_calibracion}</p>
                        <p>Comentarios: {calibracion.comentarios}</p>
                        {/* Botones para actualizar y eliminar */}
                        <button onClick={() => actualizarCalibracion(calibracion.idcod_calibracion)}>Actualizar</button>
                        <button onClick={() => eliminarCalibracion(calibracion.idcod_calibracion)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CalibracionEq;
