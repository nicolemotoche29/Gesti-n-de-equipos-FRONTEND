import React, { useState } from 'react';
import axios from 'axios';
import Mensaje from "../Alerta/Mensaje";

const ConfirmarTKUser = () => {
    const [mensaje, setMensaje] = useState(null);
    const [token, setToken] = useState('');

    const confirmarToken = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/usuarioArea/confirmar/${token}`);
            setMensaje({
                respuesta: response.data.msg || "TOKEN confirmado",
                tipo: true
            });
        } catch (error) {
            console.error('Error al confirmar el token:', error);
            setMensaje({
                tipo: "error",
                respuesta: error.response.data.msg || "Error al confirmar token"
            });
        }
    };

    const handleInputChange = (event) => {
        setToken(event.target.value);
    };

    return (
        <div>
            <h1>Confirmación de Token</h1>
            {mensaje && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <input type="text" placeholder="Ingrese el token" value={token} onChange={handleInputChange} />
            <button onClick={confirmarToken}>Confirmar Token</button>
        </div>
    );
};

export default ConfirmarTKUser;
