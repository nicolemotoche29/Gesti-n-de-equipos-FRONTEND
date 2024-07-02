// src/pages/Forgot.jsx
import React from 'react';

const Forgot = () => {
  return (
    <div className="container">
      <h2>Olvidaste tu Contraseña</h2>
      <form>
        <input type="email" placeholder="Ingresa tu correo" className="cajatexto" />
        <button className="btnform mt-3">Enviar</button>
      </form>
    </div>
  );
};

export default Forgot;
