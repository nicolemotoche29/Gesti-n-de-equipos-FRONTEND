import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './Mantenimiento.css';

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
    const [mantenimientoActualizar, setMantenimientoActualizar] = useState({
        ul_fecha_man_in: '',
        prox_fecha_man_in: '',
        ul_fecha_man_ex: '',
        prox_fecha_man_ex: '',
        id_equipo: '',
        comentario: ''
    });
    const [mostrarFormularioActualizar, setMostrarFormularioActualizar] = useState(false);
    const [idMantenimientoEliminar, setIdMantenimientoEliminar] = useState('');

    useEffect(() => {
        obtenerMantenimientos();
    }, []);

    const obtenerMantenimientos = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/mantenimientos`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMantenimientos(response.data);
        } catch (error) {
            console.error('Error al obtener los mantenimientos:', error);
        }
    };

    const crearNuevoMantenimiento = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/mantenimientos`, nuevoMantenimiento, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
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

    const prepararActualizarMantenimiento = (mantenimiento) => {
        setMantenimientoActualizar({
            ul_fecha_man_in: mantenimiento.ul_fecha_man_in,
            prox_fecha_man_in: mantenimiento.prox_fecha_man_in,
            ul_fecha_man_ex: mantenimiento.ul_fecha_man_ex,
            prox_fecha_man_ex: mantenimiento.prox_fecha_man_ex,
            id_equipo: mantenimiento.id_equipo,
            comentario: mantenimiento.comentario
        });
        setMostrarFormularioActualizar(true);
    };

    const actualizarMantenimiento = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/mantenimientos/${mantenimientoActualizar.id_equipo}`, mantenimientoActualizar, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Mantenimiento actualizado:', response.data);
            obtenerMantenimientos();
            setMostrarFormularioActualizar(false);
            setMantenimientoActualizar({
                ul_fecha_man_in: '',
                prox_fecha_man_in: '',
                ul_fecha_man_ex: '',
                prox_fecha_man_ex: '',
                id_equipo: '',
                comentario: ''
            });
        } catch (error) {
            console.error('Error al actualizar el mantenimiento:', error);
        }
    };

    const eliminarMantenimiento = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/mantenimientos/${id}`, {
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
        setIdMantenimientoEliminar(e.target.value);
    };

    const handleChangeActualizar = (e) => {
        setMantenimientoActualizar({
            ...mantenimientoActualizar,
            [e.target.name]: e.target.value
        });
    };

    const formatearFecha = (fecha) => {
        return format(new Date(fecha), 'yyyy-MM-dd');
    };

    return (
        <div className="mantenimiento-container">
            <h1 className="mantenimiento-title">Mantenimientos</h1>

            {/* Formulario para crear un nuevo mantenimiento */}
            <form className="mantenimiento-form" onSubmit={crearNuevoMantenimiento}>
                <label htmlFor="ul_fecha_man_in">Última fecha de mantenimiento interno: </label>
                <input
                    type="date"
                    id="ul_fecha_man_in"
                    name="ul_fecha_man_in"
                    value={nuevoMantenimiento.ul_fecha_man_in}
                    onChange={(e) => setNuevoMantenimiento({ ...nuevoMantenimiento, ul_fecha_man_in: e.target.value })}
                    required
                />
                <label htmlFor="prox_fecha_man_in">Próxima fecha de mantenimiento interno: </label>
                <input
                    type="date"
                    id="prox_fecha_man_in"
                    name="prox_fecha_man_in"
                    value={nuevoMantenimiento.prox_fecha_man_in}
                    onChange={(e) => setNuevoMantenimiento({ ...nuevoMantenimiento, prox_fecha_man_in: e.target.value })}
                    required
                />
                <label htmlFor="ul_fecha_man_ex">Última fecha de mantenimiento externo: </label>
                <input
                    type="date"
                    id="ul_fecha_man_ex"
                    name="ul_fecha_man_ex"
                    value={nuevoMantenimiento.ul_fecha_man_ex}
                    onChange={(e) => setNuevoMantenimiento({ ...nuevoMantenimiento, ul_fecha_man_ex: e.target.value })}
                    required
                />
                <label htmlFor="prox_fecha_man_ex">Próxima fecha de mantenimiento externo:</label>
                <input
                    type="date"
                    id="prox_fecha_man_ex"
                    name="prox_fecha_man_ex"
                    value={nuevoMantenimiento.prox_fecha_man_ex}
                    onChange={(e) => setNuevoMantenimiento({ ...nuevoMantenimiento, prox_fecha_man_ex: e.target.value })}
                    required
                />
                <input
                    type="text"
                    name="id_equipo"
                    value={nuevoMantenimiento.id_equipo}
                    onChange={(e) => setNuevoMantenimiento({ ...nuevoMantenimiento, id_equipo: e.target.value })}
                    placeholder="ID de Equipo"
                    required
                />
                <input
                    type="text"
                    name="comentario"
                    value={nuevoMantenimiento.comentario}
                    onChange={(e) => setNuevoMantenimiento({ ...nuevoMantenimiento, comentario: e.target.value })}
                    placeholder="Comentario"
                />
                <div className="button-container">
                    <button type="submit">Crear Mantenimiento</button>
                </div>
            </form>

            <h2>Actualizar Mantenimiento</h2>
            
            {/* Formulario para actualizar un mantenimiento */}
            {mostrarFormularioActualizar && (
                <form className="mantenimiento-form" onSubmit={actualizarMantenimiento}>
                    <label htmlFor="ul_fecha_man_in">Última fecha de mantenimiento interno: </label>
                    <input
                        type="date"
                        id="ul_fecha_man_in"
                        name="ul_fecha_man_in"
                        value={mantenimientoActualizar.ul_fecha_man_in}
                        onChange={handleChangeActualizar}
                        required
                    />
                    <label htmlFor="prox_fecha_man_in">Próxima fecha de mantenimiento interno:</label>
                    <input
                        type="date"
                        id="prox_fecha_man_in"
                        name="prox_fecha_man_in"
                        value={mantenimientoActualizar.prox_fecha_man_in}
                        onChange={handleChangeActualizar}
                        required
                    />
                    <label htmlFor="ul_fecha_man_ex">Última fecha de mantenimiento externo: </label>
                    <input
                        type="date"
                        id="ul_fecha_man_ex"
                        name="ul_fecha_man_ex"
                        value={mantenimientoActualizar.ul_fecha_man_ex}
                        onChange={handleChangeActualizar}
                        required
                    />
                    <label htmlFor="prox_fecha_man_ex">Próxima fecha de mantenimiento externo:</label>
                    <input
                        type="date"
                        id="prox_fecha_man_ex"
                        name="prox_fecha_man_ex"
                        value={mantenimientoActualizar.prox_fecha_man_ex}
                        onChange={handleChangeActualizar}
                        required
                    />
                    <div className="id-comments-container">
                    <input
                        type="text"
                        name="id_equipo"
                        value={mantenimientoActualizar.id_equipo}
                        onChange={handleChangeActualizar}
                        placeholder="ID de Equipo"
                        required
                    />
                    <input
                        type="text"
                        name="comentario"
                        value={mantenimientoActualizar.comentario}
                        onChange={handleChangeActualizar}
                        placeholder="Comentario"
                    />
                    </div>
                    <button type="submit">Actualizar Mantenimiento</button>
                </form>
            )}

            {/* Lista de mantenimientos */}
            <ul className="mantenimiento-list">
                {mantenimientos.map((mantenimiento) => (
                    <li key={mantenimiento.id_equipo}>
                        <p>{mantenimiento.id_equipo} - {formatearFecha(mantenimiento.ul_fecha_man_in)}</p>
                        <p>Comentario: {mantenimiento.comentario}</p>
                        {/* Botones para actualizar y eliminar */}
                        <button onClick={() => prepararActualizarMantenimiento(mantenimiento)}>Actualizar</button>
                        {/*<button onClick={() => eliminarMantenimiento(mantenimiento.id_equipo)}>Eliminar</button>*/}
                    </li>
                ))}
            </ul>

            {/* Campo para ingresar el ID del mantenimiento a eliminar */}
            <div className="mantenimiento-delete-input">
                <input
                    type="text"
                    value={idMantenimientoEliminar}
                    onChange={handleChange}
                    placeholder="Ingrese el ID del mantenimiento a eliminar"
                />
                <button onClick={() => eliminarMantenimiento(idMantenimientoEliminar)}>Eliminar Mantenimiento</button>
            </div>
        </div>
    );
};

export default MantenimientoPg;
