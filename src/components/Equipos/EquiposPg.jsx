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
    const [equipoActualizar, setEquipoActualizar] = useState(null);
    const [mostrarFormularioActualizar, setMostrarFormularioActualizar] = useState(false);
    const [idEquipoEliminar, setIdEquipoEliminar] = useState('');

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
            obtenerEquipos();
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
                area: '',
                idsupus: null
            });
        } catch (error) {
            console.error('Error al crear el nuevo equipo:', error);
        }
    };

    const prepararActualizarEquipo = (equipo) => {
        setEquipoActualizar(equipo);
        setMostrarFormularioActualizar(true);
    };

    const actualizarEquipo = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/equipos/${equipoActualizar.id}`, equipoActualizar, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Equipo actualizado:', response.data);
            obtenerEquipos();
            setMostrarFormularioActualizar(false);
            setEquipoActualizar(null);
        } catch (error) {
            console.error('Error al actualizar el equipo:', error);
        }
    };

    const eliminarEquipo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/equipos/${idEquipoEliminar}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Equipo eliminado:', response.data);
            obtenerEquipos();
            setIdEquipoEliminar(''); // Limpiar el campo de entrada después de eliminar
        } catch (error) {
            console.error('Error al eliminar el equipo:', error);
        }
    };
    
    const handleChange = (e) => {
        setIdEquipoEliminar(e.target.value); // Actualizar el estado con el valor del input
    };

    const handleChangeActualizar = (e) => {
        setEquipoActualizar({
            ...equipoActualizar,
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
                <input
                    type="text"
                    name="modelos"
                    value={nuevoEquipo.modelos}
                    onChange={handleChange}
                    placeholder="Modelos"
                    required
                />
                <input
                    type="text"
                    name="nserie"
                    value={nuevoEquipo.nserie}
                    onChange={handleChange}
                    placeholder="Nº de serie"
                    required
                />
                <input
                    type="text"
                    name="accesorios"
                    value={nuevoEquipo.accesorios}
                    onChange={handleChange}
                    placeholder="Accesorios"
                    required
                />
                <input
                    type="text"
                    name="fabricante"
                    value={nuevoEquipo.fabricante}
                    onChange={handleChange}
                    placeholder="Fabricante"
                    required
                />
                <input
                    type="text"
                    name="caracteristicas"
                    value={nuevoEquipo.caracteristicas}
                    onChange={handleChange}
                    placeholder="Caracteristicas"
                    required
                />
                <input
                    type="text"
                    name="con_instalacion"
                    value={nuevoEquipo.con_instalacion}
                    onChange={handleChange}
                    placeholder="Instalación"
                    required
                />
                <input
                    type="text"
                    name="con_utilizacion"
                    value={nuevoEquipo.con_utilizacion}
                    onChange={handleChange}
                    placeholder="Utilización"
                    required
                />
                <input
                    type="text"
                    name="area"
                    value={nuevoEquipo.area}
                    onChange={handleChange}
                    placeholder="Area"
                    required
                />
                
                <button type="submit">Crear Equipo</button>
            </form>
            <h2>Actualizar equipo</h2>
            <br></br>
            {/* Formulario para actualizar un equipo */}
            {mostrarFormularioActualizar && (
                <form onSubmit={actualizarEquipo}>
                    <input
                        type="text"
                        name="idcod"
                        value={equipoActualizar.idcod}
                        onChange={handleChangeActualizar}
                        placeholder="Código ID"
                        required
                    />
                    <input
                        type="text"
                        name="descripcion"
                        value={equipoActualizar.descripcion}
                        onChange={handleChangeActualizar}
                        placeholder="Descripción"
                        required
                    />
                    <input
                        type="text"
                        name="marca"
                        value={equipoActualizar.marca}
                        onChange={handleChangeActualizar}
                        placeholder="Marca"
                        required
                    />
                    <input
                        type="text"
                        name="modelos"
                        value={equipoActualizar.modelos}
                        onChange={handleChangeActualizar}
                        placeholder="Modelos"
                        required
                    />
                    <input
                        type="text"
                        name="nserie"
                        value={equipoActualizar.nserie}
                        onChange={handleChangeActualizar}
                        placeholder="Nº de serie"
                        required
                    />
                    <input
                        type="text"
                        name="accesorios"
                        value={equipoActualizar.accesorios}
                        onChange={handleChangeActualizar}
                        placeholder="Accesorios"
                        required
                    />
                    <input
                        type="text"
                        name="fabricante"
                        value={equipoActualizar.fabricante}
                        onChange={handleChangeActualizar}
                        placeholder="Fabricante"
                        required
                    />
                    <input
                        type="text"
                        name="caracteristicas"
                        value={equipoActualizar.caracteristicas}
                        onChange={handleChangeActualizar}
                        placeholder="Caracteristicas"
                        required
                    />
                    <input
                        type="text"
                        name="con_instalacion"
                        value={equipoActualizar.con_instalacion}
                        onChange={handleChangeActualizar}
                        placeholder="Instalación"
                        required
                    />
                    <input
                        type="text"
                        name="con_utilizacion"
                        value={equipoActualizar.con_utilizacion}
                        onChange={handleChangeActualizar}
                        placeholder="Utilización"
                        required
                    />
                    <input
                        type="text"
                        name="area"
                        value={equipoActualizar.area}
                        onChange={handleChangeActualizar}
                        placeholder="Area"
                        required
                    />
                    
                    <button type="submit">Actualizar Equipo</button>
                </form>
            )}
            {/* Campo para ingresar el ID del equipo a eliminar */}
            
            {/* Lista de equipos */}
            <ul>
                {equipos.map((equipo) => (
                    <li key={equipo.id}>
                        <p>{equipo.idcod} - {equipo.descripcion}</p>
                        {/* Botones para actualizar y eliminar */}
                        <button onClick={() => prepararActualizarEquipo(equipo)}>Actualizar</button>
                    </li>
                ))}
            </ul>
            {/* Campo para ingresar el ID del equipo a eliminar */}
            <div>
                <input
                    type="text"
                    name="idEquipoEliminar"
                    value={idEquipoEliminar.idcod}
                    onChange={handleChange}
                    placeholder="Ingrese el ID del equipo a eliminar"
                />
                <button onClick={eliminarEquipo}>Eliminar Equipo</button>
            </div>
        </div>
    );
};

export default EquiposPg;
