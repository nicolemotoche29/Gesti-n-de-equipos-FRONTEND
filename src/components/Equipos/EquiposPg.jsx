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
    const [equipoActualizar, setEquipoActualizar] = useState({
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
        setEquipoActualizar({
            idcod: equipo.idcod,
            descripcion: equipo.descripcion,
            marca: equipo.marca,
            modelos: equipo.modelos,
            nserie: equipo.nserie,
            accesorios: equipo.accesorios,
            fabricante: equipo.fabricante,
            caracteristicas: equipo.caracteristicas,
            con_instalacion: equipo.con_instalacion,
            con_utilizacion: equipo.con_utilizacion,
            area: equipo.area,
            idsupus: equipo.idsupus
        });
        setMostrarFormularioActualizar(true);
    };

    const actualizarEquipo = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/equipos/${equipoActualizar.idcod}`, equipoActualizar, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Equipo actualizado:', response.data);
            obtenerEquipos();
            setMostrarFormularioActualizar(false);
            setEquipoActualizar({
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
            setIdEquipoEliminar('');
        } catch (error) {
            console.error('Error al eliminar el equipo:', error);
        }
    };

    const handleChange = (e) => {
        setIdEquipoEliminar(e.target.value);
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
                    onChange={(e) => setNuevoEquipo({ ...nuevoEquipo, idcod: e.target.value })}
                    placeholder="Código ID"
                    required
                />
                <input
                    type="text"
                    name="descripcion"
                    value={nuevoEquipo.descripcion}
                    onChange={(e) => setNuevoEquipo({ ...nuevoEquipo, descripcion: e.target.value })}
                    placeholder="Descripción"
                    required
                />
                <input
                    type="text"
                    name="marca"
                    value={nuevoEquipo.marca}
                    onChange={(e) => setNuevoEquipo({ ...nuevoEquipo, marca: e.target.value })}
                    placeholder="Marca"
                    required
                />
                <input
                    type="text"
                    name="modelos"
                    value={nuevoEquipo.modelos}
                    onChange={(e) => setNuevoEquipo({ ...nuevoEquipo, modelos: e.target.value })}
                    placeholder="Modelos"
                    required
                />
                <input
                    type="text"
                    name="nserie"
                    value={nuevoEquipo.nserie}
                    onChange={(e) => setNuevoEquipo({ ...nuevoEquipo, nserie: e.target.value })}
                    placeholder="Nº de serie"
                    required
                />
                <input
                    type="text"
                    name="accesorios"
                    value={nuevoEquipo.accesorios}
                    onChange={(e) => setNuevoEquipo({ ...nuevoEquipo, accesorios: e.target.value })}
                    placeholder="Accesorios"
                    required
                />
                <input
                    type="text"
                    name="fabricante"
                    value={nuevoEquipo.fabricante}
                    onChange={(e) => setNuevoEquipo({ ...nuevoEquipo, fabricante: e.target.value })}
                    placeholder="Fabricante"
                    required
                />
                <input
                    type="text"
                    name="caracteristicas"
                    value={nuevoEquipo.caracteristicas}
                    onChange={(e) => setNuevoEquipo({ ...nuevoEquipo, caracteristicas: e.target.value })}
                    placeholder="Caracteristicas"
                    required
                />
                <input
                    type="text"
                    name="con_instalacion"
                    value={nuevoEquipo.con_instalacion}
                    onChange={(e) => setNuevoEquipo({ ...nuevoEquipo, con_instalacion: e.target.value })}
                    placeholder="Instalación"
                    required
                />
                <input
                    type="text"
                    name="con_utilizacion"
                    value={nuevoEquipo.con_utilizacion}
                    onChange={(e) => setNuevoEquipo({ ...nuevoEquipo, con_utilizacion: e.target.value })}
                    placeholder="Utilización"
                    required
                />
                <input
                    type="text"
                    name="area"
                    value={nuevoEquipo.area}
                    onChange={(e) => setNuevoEquipo({ ...nuevoEquipo, area: e.target.value })}
                    placeholder="Area"
                    required
                />
                
                <button type="submit">Crear Equipo</button>
            </form>

            <h2>Actualizar equipo</h2>
            
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

            {/* Lista de equipos */}
            <ul>
                {equipos.map((equipo) => (
                    <li key={equipo.idcod}>
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
                    value={idEquipoEliminar}
                    onChange={handleChange}
                    placeholder="Ingrese el ID del equipo a eliminar"
                />
                <button onClick={eliminarEquipo}>Eliminar Equipo</button>
            </div>
        </div>
    );
};

export default EquiposPg;
