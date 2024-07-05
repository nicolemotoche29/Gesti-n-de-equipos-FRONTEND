import React from 'react';
import { Link } from 'react-router-dom';
import "./nav.css"

const NavAdmin = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    console.log(token)

    // Verificar si el usuario está autenticado y tiene el rol de 'admin'
    const isAuthenticated = token && role === 'admin';

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                {isAuthenticated && (
                    <>
                        <li className="nav-item">
                            <Link to="/administrador/crear/usuario" className="nav-link">Crear un nuevo usuario</Link>
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
                            <Link to="/administrador/verificacion" className="nav-link">Verificacion</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavAdmin;
