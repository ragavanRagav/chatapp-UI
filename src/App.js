import { gapi } from "gapi-script";
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/login/Login";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/homePage/Home";

function App() {
  const clientId = "975481281366-3n2for71bc6d3dmuq9171ntt342cnb39.apps.googleusercontent.com";
  useEffect(() => {
    const start = () => {
      gapi.client.init({clientId: clientId, scope: ""});
    };
    gapi.load("client:auth2", start);
  });

  return (
    <div className="App">

  <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={ <Login />} />
      <Route path="/" element={ <ProtectedRoute element={<Home />}/>} />
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
