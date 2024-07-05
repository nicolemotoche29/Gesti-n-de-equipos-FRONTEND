import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  PrivateRoute  from "./routes/PrivateRoute";
//
import Login from "./pages/Login";
import RegistrarAdmin from "./components/Administrador/RegistrarAdmin";
import Recuperar from "./pages/Recuperar"
// Administrador
import PerfilAdmin from "./components/Administrador/PerfilAdmin";
import ListaUsuarios from "./components/Administrador/ListaUsuarios";
import NavAdmin from "./components/Administrador/NavAdmin"
import ConfirmarTk from "./components/Administrador/ConfirmarTk";
import ResetPass from "./pages/ResetPass";
import CrearUsuario from "./components/Administrador/CrearUsuario";
// Calibracion
import Calibracion from "./components/Calibracion/CalibracionEq";
// Equipos
import EquiposPg from "./components/Equipos/EquiposPg";
// Mantenimiento
import MantenimientoPg from "./components/Mantenimiento/MantenimientoPg";
//Verificación
import VerificacionPg from "./components/Verificaciones/VerificacionPg";
// Usuario
import LoginUser from "./components/Usuario/LoginUser";
import NavUser from "./components/Usuario/NavUser";
import RecuperarUser from "./components/Usuario/RecuperarUser";
import ResetPassUser from "./components/Usuario/ResetPassUser";
import ConfirmarTkUser from "./components/Usuario/ConfirmarTKUser";

function App() {
  return(
    <Router>
      <Routes>
        {/* Publicas */}
        <Route path="/" element={<Login/>}/>
        <Route path="/registrar-Admin" element={<RegistrarAdmin/>}/>
        <Route path="/recuperar/contraseña" element={<Recuperar/>} />
        <Route path="/administrador/perfil" element={< PerfilAdmin/>}/>
        <Route path="/administrador/lista-usuarios" element= {<ListaUsuarios/>}/>
        <Route path="/confirmar" element= {<ConfirmarTk/>}/>
        <Route path="/recuperar-password/:token" element={<ResetPass/>}/>
        
        {/* ADMINIISTRADOR */}
        <Route path="/navAdmin" element= {<NavAdmin/>}/>
        <Route
          path="/administrador/*"
          element={
              <Routes>
                <Route path="/equipos" element= {<EquiposPg/>}/>
                <Route path="/mantenimiento" element= {<MantenimientoPg/>}/>
                <Route path="/calibracion" element= {<Calibracion/>}/>
                <Route path="/verificacion" element= {<VerificacionPg/>}/>
                <Route path="/crear/usuario" element={<CrearUsuario/>}/>
              </Routes>
          }
        />

        {/* USUARIO */}
        <Route path="/login-user" element={<LoginUser/>}/>
        <Route path="/navUser" element ={<NavUser/>}/>
        <Route path="usuarioArea/confirmar/:token" element={<ConfirmarTkUser/>}/>
        <Route path="/recuperar/contraseña/usuario" element = {<RecuperarUser/>}/>
        <Route path="/usuarioArea/recuperar-password/:token" element={<ResetPassUser/>}/>
        <Route
          path="/usuario/*"
          element={
              <Routes>
                <Route path="/equipos" element= {<EquiposPg/>}/>
                <Route path="/mantenimiento" element= {<MantenimientoPg/>}/>
                <Route path="/calibracion" element= {<Calibracion/>}/>
                <Route path="/verificacion" element= {<VerificacionPg/>}/>
              </Routes>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
