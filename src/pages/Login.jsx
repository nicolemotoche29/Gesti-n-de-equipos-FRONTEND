import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import login from '../assets/images/login.png';
import profile from '../assets/images/profile.png';
import Mensaje from '../components/Alerta/Mensaje';
import '../App.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (!form.email || !form.password) {
            setMensaje({ tipo: 'error', respuesta: 'Por favor, completa todos los campos.' });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(form.email)) {
            setMensaje({ tipo: 'error', respuesta: 'Por favor, introduce un correo electrónico válido.' });
            return;
        }

        if (form.password.length < 8) {
            setMensaje({ tipo: 'error', respuesta: 'La contraseña debe tener al menos 8 caracteres.' });
            return;
        }

        try {
            const url = `${import.meta.env.VITE_URL_BACKEND}/login`; // Corregido a VITE_URL_BACKEND
            const respuesta = await axios.post(url, form);

            if (respuesta && respuesta.data) {
                localStorage.setItem('token', respuesta.data.token);
                localStorage.setItem('role', 'admin'); // Asignar 'admin' como rol único para el administrador

                navigate('/navAdmin'); // Redirigir a la página NavAdmin para el administrador
            } else {
                console.error('La respuesta o su propiedad "data" no están definidas correctamente:', respuesta);
                setMensaje({ tipo: 'error', respuesta: 'Error al iniciar sesión. Por favor, verifica tus credenciales.' });
            }
        } catch (error) {
            // Manejo de errores
            console.error('Error al iniciar sesión:', error);
            setMensaje({ tipo: 'error', respuesta: 'Error al iniciar sesión. Por favor, verifica tus credenciales.' });
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="padre">
                        <div className="card card-body shadow-lg">
                            <img src={profile} alt="Profile" className="estilo-profile" />
                            {mensaje && (
                                <Mensaje tipo={mensaje.tipo} className={mensaje.tipo === 'error' ? 'mensaje-error' : ''}>
                                    {mensaje.respuesta}
                                </Mensaje>
                            )}
                            <form onSubmit={handleSubmit} className="w-full max-w-md">
                                <input
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Ingresar correo"
                                    className="cajatexto"
                                    required
                                />
                                
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Ingresar contraseña"
                                        className="cajatexto"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="show-password-btn"
                                    >
                                        {showPassword ? 'Ocultar' : 'Mostrar'} contraseña
                                    </button>
                                </div>
                                
                                <button type="submit" className="btnform mt-3">Iniciar Sesión</button>
                            </form>
                            <div>
                                <Link to="/recuperar/contraseña">¿Olvidaste tu contraseña?</Link>
                            </div>
                            
                            <div className="my-3">
                                <p>¿No tienes una cuenta? </p>
                            </div>
                            
                            <Link to="/login-user" className="btnform mt-2">Iniciar sesión como Usuario</Link>
                            <Link to="/registrar-Admin" className="btnform mt-2">Registrarse como Administrador</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <img src={login} alt="Login" className="tamaño-imagen" />
                </div>
            </div>
        </div>
    );
};

export default Login;
