import React, { useState } from 'react';
import axios from 'axios';
import Mensaje from "../Alerta/Mensaje";
import './crearU.css';

const CrearUsuario = () => {
    const [mensaje, setMensaje] = useState({});
    const [usuario, setUsuario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        area: ''
    });

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/usuarioArea/registro`, usuario, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Usuario creado:', response.data);
            // Limpiar los campos del formulario después de la creación exitosa
            setUsuario({
                nombre: '',
                apellido: '',
                email: '',
                area: ''
            });
            setMensaje({
                respuesta: respuesta.data.msg || "Revisa tu correo electronico para iniciar sesión",
                tipo: true
            })
        } catch (error) {
            console.error('Error al crear usuario:', error);
            setMensaje({
                tipo: "error",
                respuesta: error.response.data.msg || "Error al crear usuario"
            })
        }
    };

    return (
        <div className="container">
            <h2>Crear Usuario</h2>
            {Object.keys(mensaje).length > 0 && (
        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
      )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={usuario.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">Apellido:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="apellido"
                        name="apellido"
                        value={usuario.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={usuario.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="area" className="form-label">Área:</label>
                    <select
                        className="form-control"
                        id="area"
                        name="area"
                        value={usuario.area}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un área</option>
                        <option value="Área 1">Área 1</option>
                        <option value="Área 2">Área 2</option>
                        <option value="Área 3">Área 3</option>
                        <option value="Área 4">Área 4</option>
                        <option value="Área 5">Área 5</option>
                        <option value="Área 6">Área 6</option>
                        <option value="Área 7">Área 7</option>
                        <option value="Área 8">Área 8</option>
                        <option value="Área 9">Área 9</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Crear Usuario</button>
            </form>
        </div>
    );
};

export default CrearUsuario;
