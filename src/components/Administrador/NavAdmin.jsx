import React from 'react';
import { Link } from 'react-router-dom';

const NavAdmin = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/administrador/lista-usuarios">Lista de usuarios</Link></li>
        <li><Link to="/administrador/perfil">Perfil</Link></li>
        <li><Link to="administrador/usuario/:{id}">Actualizar</Link></li>
      </ul>
    </nav>
  );
};

export default NavAdmin;
