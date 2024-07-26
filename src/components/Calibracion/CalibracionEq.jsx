import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './calibracion.css';

const CalibracionEq = () => {
    const [calibraciones, setCalibraciones] = useState([]);
    const [nuevaCalibracion, setNuevaCalibracion] = useState({
        ul_fecha_cal_in: '',
        prox_fecha_cal_in: '',
        ul_fecha_cal_ex: '',
        prox_fecha_cal_ex: '',
        idcod_calibracion: '',
        comentarios: ''
    });
    const [calibracionActualizar, setCalibracionActualizar] = useState({
        ul_fecha_cal_in: '',
        prox_fecha_cal_in: '',
        ul_fecha_cal_ex: '',
        prox_fecha_cal_ex: '',
        idcod_calibracion: '',
        comentarios: ''
    });
    const [mostrarFormularioActualizar, setMostrarFormularioActualizar] = useState(false);
    const [idCalibracionEliminar, setIdCalibracionEliminar] = useState('');

    useEffect(() => {
        obtenerCalibraciones();
    }, []);

    const obtenerCalibraciones = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/calibraciones`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCalibraciones(response.data);
        } catch (error) {
            console.error('Error al obtener las calibraciones:', error);
        }
    };

    const crearNuevaCalibracion = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/calibraciones`, nuevaCalibracion, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Nueva calibración creada:', response.data);
            obtenerCalibraciones();
            setNuevaCalibracion({
                ul_fecha_cal_in: '',
                prox_fecha_cal_in: '',
                ul_fecha_cal_ex: '',
                prox_fecha_cal_ex: '',
                idcod_calibracion: '',
                comentarios: ''
            });
        } catch (error) {
            console.error('Error al crear la nueva calibración:', error);
        }
    };

    const prepararActualizarCalibracion = (calibracion) => {
        setCalibracionActualizar({
            ul_fecha_cal_in: calibracion.ul_fecha_cal_in,
            prox_fecha_cal_in: calibracion.prox_fecha_cal_in,
            ul_fecha_cal_ex: calibracion.ul_fecha_cal_ex,
            prox_fecha_cal_ex: calibracion.prox_fecha_cal_ex,
            idcod_calibracion: calibracion.idcod_calibracion,
            comentarios: calibracion.comentarios
        });
        setMostrarFormularioActualizar(true);
    };

    const actualizarCalibracion = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/calibraciones/${calibracionActualizar.idcod_calibracion}`, calibracionActualizar, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Calibración actualizada:', response.data);
            obtenerCalibraciones();
            setMostrarFormularioActualizar(false);
            setCalibracionActualizar({
                ul_fecha_cal_in: '',
                prox_fecha_cal_in: '',
                ul_fecha_cal_ex: '',
                prox_fecha_cal_ex: '',
                idcod_calibracion: '',
                comentarios: ''
            });
        } catch (error) {
            console.error('Error al actualizar la calibración:', error);
        }
    };

    const eliminarCalibracion = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/calibraciones/${idCalibracionEliminar}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Calibración eliminada:', response.data);
            obtenerCalibraciones();
            setIdCalibracionEliminar('');
        } catch (error) {
            console.error('Error al eliminar la calibración:', error);
        }
    };

    const handleChange = (e) => {
        setIdCalibracionEliminar(e.target.value);
    };

    const handleChangeActualizar = (e) => {
        setCalibracionActualizar({
            ...calibracionActualizar,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="calibraciones-container">
            <h1 className="calibraciones-title">Calibraciones</h1>

            {/* Formulario para crear una nueva calibración */}
            <form className="calibraciones-form" onSubmit={crearNuevaCalibracion}>
                <label htmlFor="ul_fecha_cal_in">Última fecha de calibración interna: </label>
                <input
                    type="date"
                    id="ul_fecha_cal_in"
                    name="ul_fecha_cal_in"
                    value={nuevaCalibracion.ul_fecha_cal_in}
                    onChange={(e) => setNuevaCalibracion({ ...nuevaCalibracion, ul_fecha_cal_in: e.target.value })}
                    required
                />
                <label htmlFor="prox_fecha_cal_in">Próxima fecha de calibración interna: </label>
                <input
                    type="date"
                    id="prox_fecha_cal_in"
                    name="prox_fecha_cal_in"
                    value={nuevaCalibracion.prox_fecha_cal_in}
                    onChange={(e) => setNuevaCalibracion({ ...nuevaCalibracion, prox_fecha_cal_in: e.target.value })}
                    required
                />
                <label htmlFor="ul_fecha_cal_ex">Última fecha de calibración externa: </label>
                <input
                    type="date"
                    id="ul_fecha_cal_ex"
                    name="ul_fecha_cal_ex"
                    value={nuevaCalibracion.ul_fecha_cal_ex}
                    onChange={(e) => setNuevaCalibracion({ ...nuevaCalibracion, ul_fecha_cal_ex: e.target.value })}
                    required
                />
                <label htmlFor="prox_fecha_cal_ex">Próxima fecha de calibración externa: </label>
                <input
                    type="date"
                    id="prox_fecha_cal_ex"
                    name="prox_fecha_cal_ex"
                    value={nuevaCalibracion.prox_fecha_cal_ex}
                    onChange={(e) => setNuevaCalibracion({ ...nuevaCalibracion, prox_fecha_cal_ex: e.target.value })}
                    required
                />
                <input
                    type="text"
                    name="idcod_calibracion"
                    value={nuevaCalibracion.idcod_calibracion}
                    onChange={(e) => setNuevaCalibracion({ ...nuevaCalibracion, idcod_calibracion: e.target.value })}
                    placeholder="ID de Calibración"
                    required
                />
                <input
                    type="text"
                    name="comentarios"
                    value={nuevaCalibracion.comentarios}
                    onChange={(e) => setNuevaCalibracion({ ...nuevaCalibracion, comentarios: e.target.value })}
                    placeholder="Comentarios"
                />
                <div className="button-container">
                    <button type="submit">Crear Calibración</button>
                </div>
            </form>

            <h2>Actualizar Calibración</h2>
            
            {/* Formulario para actualizar una calibración */}
            {mostrarFormularioActualizar && (
                <form className="calibraciones-form" onSubmit={actualizarCalibracion}>
                    <label htmlFor="ul_fecha_cal_in_actualizar">Última fecha de calibración interna</label>
                    <input
                        type="date"
                        id="ul_fecha_cal_in_actualizar"
                        name="ul_fecha_cal_in"
                        value={calibracionActualizar.ul_fecha_cal_in}
                        onChange={handleChangeActualizar}
                        required
                    />
                    <label htmlFor="prox_fecha_cal_in_actualizar">Próxima fecha de calibración interna</label>
                    <input
                        type="date"
                        id="prox_fecha_cal_in_actualizar"
                        name="prox_fecha_cal_in"
                        value={calibracionActualizar.prox_fecha_cal_in}
                        onChange={handleChangeActualizar}
                        required
                    />
                    <label htmlFor="ul_fecha_cal_ex_actualizar">Última fecha de calibración externa</label>
                    <input
                        type="date"
                        id="ul_fecha_cal_ex_actualizar"
                        name="ul_fecha_cal_ex"
                        value={calibracionActualizar.ul_fecha_cal_ex}
                        onChange={handleChangeActualizar}
                        required
                    />
                    <label htmlFor="prox_fecha_cal_ex_actualizar">Próxima fecha de calibración externa</label>
                    <input
                        type="date"
                        id="prox_fecha_cal_ex_actualizar"
                        name="prox_fecha_cal_ex"
                        value={calibracionActualizar.prox_fecha_cal_ex}
                        onChange={handleChangeActualizar}
                        required
                    />
                    <div className="id-comments-container">
                        <input
                            type="text"
                            name="idcod_calibracion"
                            value={calibracionActualizar.idcod_calibracion}
                            onChange={handleChangeActualizar}
                            placeholder="ID de Calibración"
                            required
                        />
                        <input
                            type="text"
                            name="comentarios"
                            value={calibracionActualizar.comentarios}
                            onChange={handleChangeActualizar}
                            placeholder="Comentarios"
                        />
                    </div>
                    <button type="submit">Actualizr Calibración</button>
                </form>
            )}

            {/* Lista de calibraciones */}
            <ul className="calibraciones-list">
                {calibraciones.map((calibracion) => (
                    <li key={calibracion.idcod_calibracion}>
                        <p>ID: {calibracion.idcod_calibracion}</p>
                        <p>Comentarios: {calibracion.comentarios}</p>
                        {/* Botones para actualizar y eliminar */}
                        <button onClick={() => prepararActualizarCalibracion(calibracion)}>Actualizar</button>
                        {/*<button onClick={() => eliminarCalibracion(calibracion.idcod_calibracion)}>Eliminar</button>*/}
                    </li>
                ))}
            </ul>

            {/* Campo para ingresar el ID de la calibración a eliminar */}
            <div className="calibraciones-delete-input">
                <input
                    type="text"
                    value={idCalibracionEliminar}
                    onChange={handleChange}
                    placeholder="Ingrese el ID de la calibración a eliminar"
                />
                <button onClick={() => eliminarCalibracion(idCalibracionEliminar)}>Eliminar Calibración</button>
            </div>
        </div>
    );
};

export default CalibracionEq;
