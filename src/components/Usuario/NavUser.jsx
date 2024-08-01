import React from 'react';
import { Link } from 'react-router-dom';
import '../Administrador/nav.css';
import documento from '../../assets/images/documento.png';

const NavUser = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Verificar si el usuario está autenticado y tiene el rol de 'admin'
    const isAuthenticated = token && role === 'usuario';

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="brand-logo">INICIO</Link>
            </div>
            <ul className="navbar-nav">
                {isAuthenticated && (
                    <>
                        <li className="nav-item">
                            <Link to="/usuario/equipos" className="nav-link">Equipos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/usuario/calibracion" className="nav-link">Calibracion</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/usuario/mantenimiento" className="nav-link">Mantenimiento</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/usuario/verificacion" className="nav-link">Verificacion</Link>
                        </li>
                        <img src={documento} alt="Descripción de la imagen" className="footer-image" />
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavUser;
