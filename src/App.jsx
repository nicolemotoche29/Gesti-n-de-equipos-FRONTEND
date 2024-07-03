import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Private } from "./routes/Private";
//
import Login from "./pages/Login";
import RegistrarAdmin from "./components/Administrador/RegistrarAdmin";
import RegistrarUsuario from "./components/Usuario/RegistrarUsuario";
import Recuperar from "./pages/Recuperar"
// Administrador
import NavAdmin from "./components/Administrador/NavAdmin"

function App() {
  return(
<Router>
    <Routes>
      {/*Publicas*/}
      <Route path="/" element={<Login/>}/>
      <Route path="/registrar-Admin" element={< RegistrarAdmin/>}/>
      <Route path="/registrar-Usuario" element={< RegistrarUsuario/>}/>
      <Route path="/recuperar/contraseña" element={< Recuperar/>} />
    </Routes>

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
  </Router>
  )
  
}

export default App;
