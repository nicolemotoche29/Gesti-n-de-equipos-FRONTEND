import React, { useState } from 'react';
import axios from 'axios';

const ConfirmarTk = () => {
    const [mensaje, setMensaje] = useState('');
    const [token, setToken] = useState('');

    const confirmarToken = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/confirmar/${token}`);
            setMensaje(response.data.message);
            // Aquí puedes manejar la respuesta del backend según sea necesario
        } catch (error) {
            console.error('Error al confirmar el token:', error);
            setMensaje('Error al confirmar el token');
        }
    };

    const handleInputChange = (event) => {
        setToken(event.target.value);
    };

    return (
        <div>
            <h1>Confirmación de Token</h1>
            <input type="text" placeholder="Ingrese el token" value={token} onChange={handleInputChange} />
            <button onClick={confirmarToken}>Confirmar Token</button>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default ConfirmarTk;
