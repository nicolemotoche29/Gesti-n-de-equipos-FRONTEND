import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VerificacionPg = () => {
    const [verificaciones, setVerificaciones] = useState([]);
    const [nuevaVerificacion, setNuevaVerificacion] = useState({
        id_equipo: '',
        ver_interna: null,
        ver_externa: null,
        operativo: true,
        fuera_de_uso: false,
        dado_de_baja: false,
        observaciones: null,
        estado: 'EN USO',
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
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/verificaciones`);
            setVerificaciones(response.data);
        } catch (error) {
            console.error('Error al obtener las verificaciones:', error);
        }
    };

    const crearNuevaVerificacion = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/verificaciones`, nuevaVerificacion);
            console.log('Nueva verificación creada:', response.data);
            obtenerVerificaciones();
            setNuevaVerificacion({
                id_equipo: '',
                ver_interna: null,
                ver_externa: null,
                operativo: true,
                fuera_de_uso: false,
                dado_de_baja: false,
                observaciones: null,
                estado: 'EN USO',
                elaborado: '',
                fecha_elab: '',
                revisado: '',
                fecha_rev: '',
                ul_fecha_ac: ''
            });
        } catch (error) {
            console.error('Error al crear la nueva verificación:', error);
        }
    };

    const actualizarVerificacion = async (id_equipo) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/verificaciones/${id_equipo}`, nuevaVerificacion);
            console.log('Verificación actualizada:', response.data);
            obtenerVerificaciones();
        } catch (error) {
            console.error('Error al actualizar la verificación:', error);
        }
    };

    const eliminarVerificacion = async (id_equipo) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/verificaciones/${id_equipo}`);
            console.log('Verificación eliminada:', response.data);
            obtenerVerificaciones();
        } catch (error) {
            console.error('Error al eliminar la verificación:', error);
        }
    };

    const handleChange = (e) => {
        setNuevaVerificacion({
            ...nuevaVerificacion,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h1>Verificaciones</h1>

            {/* Formulario para crear una nueva verificación */}
            <form onSubmit={crearNuevaVerificacion}>
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
                    placeholder="Ver interna"
                    required
                />
                <input
                    type="text"
                    name="ver_externa"
                    value={nuevaVerificacion.ver_externa}
                    onChange={handleChange}
                    placeholder="Ver externa"
                    required
                />
                <input
                    type="text"
                    name="operativo"
                    value={nuevaVerificacion.operativo}
                    onChange={handleChange}
                    placeholder="Operativo"
                    required
                />
                <input
                    type="text"
                    name="fuera_de_uso"
                    value={nuevaVerificacion.fuera_de_uso}
                    onChange={handleChange}
                    placeholder="Fuera de uso"
                    required
                />
                <input
                    type="text"
                    name="dado_de_baja"
                    value={nuevaVerificacion.dado_de_baja}
                    onChange={handleChange}
                    placeholder="De baja"
                    required
                />
                <input
                    type="text"
                    name="observaciones"
                    value={nuevaVerificacion.observaciones}
                    onChange={handleChange}
                    placeholder="Observaciones"
                    required
                />
                <input
                    type="text"
                    name="estado"
                    value={nuevaVerificacion.estado}
                    onChange={handleChange}
                    placeholder="Estado"
                    required
                />
                <input
                    type="text"
                    name="elaborado"
                    value={nuevaVerificacion.elaborado}
                    onChange={handleChange}
                    placeholder="Elaborado"
                    required
                />
                <input
                    type="text"
                    name="fecha_elab"
                    value={nuevaVerificacion.fecha_elab}
                    onChange={handleChange}
                    placeholder="Fecha elaboración"
                    required
                />
                <input
                    type="text"
                    name="revisado"
                    value={nuevaVerificacion.revisado}
                    onChange={handleChange}
                    placeholder="Revisado"
                    required
                />
                <input
                    type="text"
                    name="fecha_rev"
                    value={nuevaVerificacion.fecha_rev}
                    onChange={handleChange}
                    placeholder="Fecha revisión"
                    required
                />
                <input
                    type="text"
                    name="ul_fecha_ac"
                    value={nuevaVerificacion.ul_fecha_ac}
                    onChange={handleChange}
                    placeholder="Fecha AC"
                    required
                />
                <button type="submit">Crear Verificación</button>
            </form>

            {/* Lista de verificaciones */}
            <ul>
                {verificaciones.map((verificacion) => (
                    <li key={verificacion.id_equipo}>
                        <p>ID de Equipo: {verificacion.id_equipo}</p>
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
