import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Private } from "./routes/Private";
//
import Login from "./pages/Login";
import RegistrarAdmin from "./components/Administrador/RegistrarAdmin";
import Recuperar from "./pages/Recuperar"
// Administrador
import PerfilAdmin from "./components/Administrador/PerfilAdmin";
import ListaUsuarios from "./components/Administrador/ListaUsuarios";
import NavAdmin from "./components/Administrador/NavAdmin"
// Calibracion
import Calibracion from "./components/Calibracion/CalibracionEq";
// Equipos
import EquiposPg from "./components/Equipos/EquiposPg";
// Mantenimiento
import MantenimientoPg from "./components/Mantenimiento/MantenimientoPg";
// Usuario
import LoginUser from "./components/Usuario/LoginUser";

function App() {
  return(
    <Router>
      <Routes>
        {/* Publicas */}
        <Route path="/" element={<Login/>}/>
        <Route path="/registrar-Admin" element={<RegistrarAdmin/>}/>
        <Route path="/login-user" element={<LoginUser/>}/>
        <Route path="/recuperar/contraseña" element={<Recuperar/>} />
        <Route path="/administrador/perfil" element={< PerfilAdmin/>}/>
        <Route path="/administrador/lista-usuarios" element= {<ListaUsuarios/>}/>
        <Route path="/calibracion" element= {<Calibracion/>}/>
        <Route path="/equipos" element= {<EquiposPg/>}/>
        <Route path="/mantenimiento" element= {<MantenimientoPg/>}/>
         <Route path="/navAdmin" element= {<NavAdmin/>}/>
        {/* Privadas 
        <Route
          path="/administrador/*"
          element={
            <Private>
              <NavAdmin/>
              <Routes>
                <Route path="registrar-equipo"/>
              </Routes>
            </Private>
          }
        />
        
        */}
        
        
      </Routes>
    </Router>
  );
}

export default App;
