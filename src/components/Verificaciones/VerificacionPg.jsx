import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VerificacionesPg.css'; // Importa el archivo CSS

const VerificacionPg = () => {
    const [verificaciones, setVerificaciones] = useState([]);
    const [nuevaVerificacion, setNuevaVerificacion] = useState({
        id_equipo: '',
        ver_interna: '',
        ver_externa: '',
        operativo: '',
        fuera_de_uso: '',
        dado_de_baja: '',
        observaciones: '',
        estado: 'en uso',
        elaborado: '',
        fecha_elab: '',
        revisado: '',
        fecha_rev: '',
        ul_fecha_ac: ''
    });

    useEffect(() => {
        obtenerVerificaciones();
    }, []);

    const obtenerVerificaciones = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/verificaciones`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setVerificaciones(response.data);
        } catch (error) {
            console.error('Error al obtener las verificaciones:', error);
        }
    };

    const crearNuevaVerificacion = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const data = {
                ...nuevaVerificacion,
                operativo: nuevaVerificacion.operativo === 'si',
                fuera_de_uso: nuevaVerificacion.fuera_de_uso === 'si',
                dado_de_baja: nuevaVerificacion.dado_de_baja === 'si'
            };
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/verificaciones`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Nueva verificación creada:', response.data);
            obtenerVerificaciones();
            resetForm();
        } catch (error) {
            console.error('Error al crear la nueva verificación:', error);
        }
    };

    const actualizarVerificacion = async (id_equipo) => {
        try {
            const token = localStorage.getItem('token');
            const data = {
                ...nuevaVerificacion,
                operativo: nuevaVerificacion.operativo === 'si',
                fuera_de_uso: nuevaVerificacion.fuera_de_uso === 'si',
                dado_de_baja: nuevaVerificacion.dado_de_baja === 'si'
            };
            const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/verificaciones/${id_equipo}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Verificación actualizada:', response.data);
            obtenerVerificaciones();
        } catch (error) {
            console.error('Error al actualizar la verificación:', error);
        }
    };

    const eliminarVerificacion = async (id_equipo) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/verificaciones/${id_equipo}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Verificación eliminada:', response.data);
            obtenerVerificaciones();
        } catch (error) {
            console.error('Error al eliminar la verificación:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaVerificacion(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const resetForm = () => {
        setNuevaVerificacion({
            id_equipo: '',
            ver_interna: '',
            ver_externa: '',
            operativo: '',
            fuera_de_uso: '',
            dado_de_baja: '',
            observaciones: '',
            estado: 'en uso',
            elaborado: '',
            fecha_elab: '',
            revisado: '',
            fecha_rev: '',
            ul_fecha_ac: ''
        });
    };

    return (
        <div className="verificacion-container">
            <h1>Verificaciones</h1>

            {/* Formulario para crear una nueva verificación */}
            <form className="verificacion-form" onSubmit={crearNuevaVerificacion}>
                <input
                    type="text"
                    name="id_equipo"
                    value={nuevaVerificacion.id_equipo}
                    onChange={handleChange}
                    placeholder="ID de Equipo"
                    required
                />
                <input
                    type="text"
                    name="ver_interna"
                    value={nuevaVerificacion.ver_interna}
                    onChange={handleChange}
                    placeholder="Verificación Interna"
                    required
                />
                <input
                    type="text"
                    name="ver_externa"
                    value={nuevaVerificacion.ver_externa}
                    onChange={handleChange}
                    placeholder="Verificación Externa"
                    required
                />
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="operativo"
                            value="si"
                            checked={nuevaVerificacion.operativo === 'si'}
                            onChange={handleChange}
                        />
                        Operativo
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="fuera_de_uso"
                            value="si"
                            checked={nuevaVerificacion.fuera_de_uso === 'si'}
                            onChange={handleChange}
                        />
                        Fuera de uso
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="dado_de_baja"
                            value="si"
                            checked={nuevaVerificacion.dado_de_baja === 'si'}
                            onChange={handleChange}
                        />
                        Dado de baja
                    </label>
                </div>
                <textarea
                    name="observaciones"
                    value={nuevaVerificacion.observaciones}
                    onChange={handleChange}
                    placeholder="Observaciones"
                />
                <select
                    name="estado"
                    value={nuevaVerificacion.estado}
                    onChange={handleChange}
                    required
                >
                    <option value="en uso">En uso</option>
                    <option value="desconectado">Desconectado</option>
                    <option value="desuso">Desuso</option>
                    <option value="pendiente">Pendiente</option>
                    {/* Otras opciones pueden ser añadidas aquí */}
                </select>
                <input
                    type="text"
                    name="elaborado"
                    value={nuevaVerificacion.elaborado}
                    onChange={handleChange}
                    placeholder="Elaborado por"
                    required
                />
                <input
                    type="date"
                    name="fecha_elab"
                    value={nuevaVerificacion.fecha_elab}
                    onChange={handleChange}
                    placeholder="Fecha de elaboración"
                    required
                />
                <input
                    type="text"
                    name="revisado"
                    value={nuevaVerificacion.revisado}
                    onChange={handleChange}
                    placeholder="Revisado por"
                    required
                />
                <input
                    type="date"
                    name="fecha_rev"
                    value={nuevaVerificacion.fecha_rev}
                    onChange={handleChange}
                    placeholder="Fecha de revisión"
                    required
                />
                <input
                    type="date"
                    name="ul_fecha_ac"
                    value={nuevaVerificacion.ul_fecha_ac}
                    onChange={handleChange}
                    placeholder="Última fecha de actividad"
                    required
                />
                <button type="submit">Crear Verificación</button>
            </form>

            {/* Lista de verificaciones */}
            <ul className="verificacion-list">
                {verificaciones.map((verificacion) => (
                    <li key={verificacion.id_equipo}>
                        <p>ID de Equipo: {verificacion.id_equipo}</p>
                        <p>Verificación Interna: {verificacion.ver_interna}</p>
                        <p>Verificación Externa: {verificacion.ver_externa}</p>
                        <p>Estado: {verificacion.estado}</p>
                        {/* Mostrar otros detalles de la verificación */}
                        <button onClick={() => actualizarVerificacion(verificacion.id_equipo)}>Actualizar</button>
                        <button onClick={() => eliminarVerificacion(verificacion.id_equipo)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VerificacionPg;
