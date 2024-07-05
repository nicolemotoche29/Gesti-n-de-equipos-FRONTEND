import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Mensaje from "../Alerta/Mensaje";

const RecuperarUser = () => {
  const [mensaje, setMensaje] = useState({});
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = `${import.meta.env.VITE_URL_BACKEND}/usuarioArea/recuperar-password`;
      const respuesta = await axios.post(url, { email });
      setMensaje({
        respuesta: respuesta.data.msg || "Revisa tu correo electrónico para restablecer la contraseña",
        tipo: true
      });
      setEmail('');
    } catch (error) {
      setMensaje({
        tipo: 'error',
        respuesta: error.response.data.msg || "Lo sentimos, el usuario no se encuentra registrado"
      });
    }
  };

  return (
    <div className="container">
      <h2>Olvidaste tu Contraseña</h2>
      {Object.keys(mensaje).length > 0 && (
        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Ingresa tu correo"
          className="cajatexto"
          value={email}
          onChange={handleChange}
          required
        />
        <button className="btnform mt-3">Enviar</button>
      </form>
      <div className="mt-5 text-xs border-b-2 py-4"></div>
      <div className="mt-3 text-sm flex justify-between items-center">
        <p>¿Ya te acordaste?</p>
        <Link
          to="/"
          className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default RecuperarUser;
