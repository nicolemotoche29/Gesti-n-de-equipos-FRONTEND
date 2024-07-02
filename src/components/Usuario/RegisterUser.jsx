import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import registro from "../../assets/images/registro.png";
import Mensaje from "../Alerta/Mensaje";
import './RegisterUser.css'; // Importa el archivo CSS

const RegisterUser = () => {
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  // Estados para la longitud de los campos
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    const maxLengths = {
      nombre: 30,
      apellido: 30,
      email: 50,
      password: 20,
    };

    // Validar si el campo de celular solo contiene números
    if (e.target.name === "celular" && !/^\d*$/.test(newValue)) {
      return; // Si no son números, no actualices el estado
    }

    if (newValue.length <= maxLengths[e.target.name]) {
      setForm({
        ...form,
        [e.target.name]: newValue,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.URL_BACKEND}/registro`;

      const respuesta = await axios.post(url, form);

      setMensaje({
        respuesta: respuesta.data.msg || "Ya puedes iniciar sesión",
        tipo: "succes",
      });
      setForm({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMensaje({
        respuesta: error.response?.data.msg || "Respuesta errónea del servidor",
        tipo: "error",
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg position-relative">
            
            <div className="card-body">
              <h3 className="mb-8">Registro Usuario</h3>
              {Object.keys(mensaje).length > 0 && (
                <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
              )}
              <form onSubmit={handleSubmit}>
                <div className="inputGroup">
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre:
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="Ingresa tu nombre"
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">
                      Apellido:
                    </label>
                    <input
                      type="text"
                      id="apellido"
                      name="apellido"
                      value={form.apellido}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="Ingresa tu apellido"
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="Ingresa tu correo electrónico"
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña: (Mínimo 8 caracteres)
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Ingresa tu contraseña"
                        required
                        className="form-control"
                      />
                      <button
                        type="button"
                        className="btn btn-link show-password-btn"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? "Ocultar" : "Mostrar"}
                      </button>
                    </div>
                  </div>

                  <div className="login mt-3 text-center">
                    <button type="submit" className="btn btn-primary">
                        Registrarse
                    </button>
                    </div>
                </div>
              </form>

              <div className="card shadow-lg mt-3">
                <div className="card-body text-center">
                    <p>¿Ya tienes una cuenta?</p>
                    <Link to="/" className="btn btn-linkbtn btn-primary">
                    Iniciar sesión
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <img src={registro} alt="Registro" className="tamaño-imagen" />
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
    