import { useState } from "react";
import login from '../assets/images/login.png';
import profile from '../assets/images/profile.png';
import '../App.css'; // Asegúrate de importar tus estilos CSS
import { Link  } from "react-router-dom";

 const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="container">
            <div className="row ">
                <div className="col-md-4">
                <div className="padre ">
                    <div className="card card-body shadow-lg">
                    <img src={profile} alt="" className="estilo-profile" />
                    <form>
                        <input type="text" placeholder="Ingresar correo" className="cajatexto" />
                        
                        <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Ingresar contraseña"
                            className="cajatexto"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="show-password-btn"
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'} contraseña
                        </button>
                        </div> 
                        
                        <button className="btnform mt-3">Iniciar Sesión</button>
                    </form>
                    <div className="my-3">
                        <p>
                            ¿No tienes una cuenta?{" "}
                        </p>
                    </div>
                    <Link to="/registerUser" type="submit" class="btnform mt-2">
                    Registrarse como Usuario
                    </Link>
                    <Link to="/registerAdmin" type="submit" class="btnform mt-2">
                    Registrarse como Administrador
                    </Link>
                    </div>
                </div>
                </div>

                <div className="col-md-8">
                <img src={login} alt="" className="tamaño-imagen" />
                </div>
            </div>
            </div>
        );
    };

export default Login;