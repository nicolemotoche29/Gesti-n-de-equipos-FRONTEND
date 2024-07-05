import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Mensaje from "../Alerta/Mensaje";

const ConfirmarTk = () => {
    const [mensaje, setMensaje] = useState(null);
    const { token } = useParams(); // Obtiene el token de los parámetros de la URL

    useEffect(() => {
        const confirmarToken = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/confirmar/${token}`);
                setMensaje({
                    respuesta: "TOKEN confirmado. Ya puedes iniciar sesión.",
                    tipo: true
                });
            } catch (error) {
                console.error('Error al confirmar el token:', error);
                setMensaje({
                    tipo: "error",
                    respuesta: error.response?.data?.msg || "Error al confirmar token"
                });
            }
        };

        if (token) {
            confirmarToken();
        }
    }, [token]);

    return (
        <div>
            <h1>Confirmación de Token</h1>
            {mensaje && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
        </div>
    );
};

export default ConfirmarTk;
