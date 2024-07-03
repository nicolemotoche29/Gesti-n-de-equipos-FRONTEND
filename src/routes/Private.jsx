
import { Navigate } from 'react-router-dom';

export const Private = ({ children }) => 
{
    const autenticado = localStorage.getItem('token')
    
    return (autenticado) ? children : <Navigate to='/' />
}
