import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../src/pages/Login";
import RegisterUser from "../src/components/Usuario/RegisterUser";
import RegisterAdmin from "../src/components/Administrador/RegisterAdmin";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/registerUser",
      element: <RegisterUser />,
    },

    {
      path: "/registerAdmin",
      element: <RegisterAdmin />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
