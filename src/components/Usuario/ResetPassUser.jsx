import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Mensaje from "../Alerta/Mensaje";

const ResetPassUser = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mensaje, setMensaje] = useState({});

  const handleChange = (e) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMensaje({ tipo: 'error', respuesta: 'Las contraseñas no coinciden' });
      return;
    }

    try {
      const url = `${import.meta.env.VITE_URL_BACKEND}/usuarioArea/nuevo-password/${token}`;
      const respuesta = await axios.post(url, { password, confirmpassword: confirmPassword });
      setMensaje({ 
        tipo: true, 
        respuesta: respuesta.data.msg || 'Contraseña restablecida correctamente' 
      });
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error:', error.response);
      setMensaje({ 
        tipo: 'error', 
        respuesta: error.response?.data?.msg || 'Error al restablecer la contraseña' 
      });
    }
  };

  return (
    <div className="container">
      <h2>Restablecer Contraseña</h2>
      {Object.keys(mensaje).length > 0 && (
        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Nueva Contraseña"
            className="cajatexto"
            value={password}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        <div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirmar Nueva Contraseña"
            className="cajatexto"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        <button className="btnform mt-3">Restablecer Contraseña</button>
      </form>
      <br />
      <div>
      <Link to="/login-user" className="btnform mt-2">
        Iniciar sesion como Usuario
      </Link>   
      </div>
    </div>
  );
};

export default ResetPassUser;
