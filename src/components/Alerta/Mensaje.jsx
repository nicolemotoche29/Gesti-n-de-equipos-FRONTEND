import React from 'react';
import './Mensaje.css'; // Asegúrate de importar el archivo CSS

const Mensaje = ({ children, tipo, className }) => {
    const isError = tipo === 'error';

    const classNames = `${isError ? 'error' : 'success'} ${className}`;

    return (
        <div className={`mensaje ${classNames}`}>
            <div>
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 6l8 8m0-8l-8 8" />
                </svg>
            </div>
            <div className="text">
                <div className="text-content">
                    <p>{children}</p>
                </div>
            </div>
        </div>
    );
}

export default Mensaje;
