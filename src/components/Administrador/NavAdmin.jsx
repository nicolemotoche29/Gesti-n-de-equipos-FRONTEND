import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import documento from '../../assets/images/documento.png';

const NavAdmin = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const isAuthenticated = token && role === 'admin';

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="brand-logo">INICIO</Link>
            </div>
            <ul className="navbar-nav">
                {isAuthenticated && (
                    <>
                        <li className="nav-item">
                            <Link to="/administrador/crear/usuario" className="nav-link">Crear Usuario</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/administrador/equipos" className="nav-link">Equipos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/administrador/calibracion" className="nav-link">Calibración</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/administrador/mantenimiento" className="nav-link">Mantenimiento</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/administrador/verificacion" className="nav-link">Verificación</Link>
                        </li>
                        <img src={documento} alt="Descripción de la imagen" className="footer-image" />
                    </>
                )}
            </ul>
            <div className="navbar-toggle">
                <span className="toggle-icon">&#9776;</span>
            </div>
        </nav>
    );
};

export default NavAdmin;
