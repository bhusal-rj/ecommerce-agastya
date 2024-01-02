import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Layout";
import { useNavigate } from "react-router-dom";

function App() {
const location=useLocation();
const navigate = useNavigate();
  useEffect(()=>{
if(location.pathname=="/"){
navigate("/dashboard");
}
  },[navigate,location]);
  return (
      <>
    <div className="flex overflow-hidden">
      <NavBar/>
      <Outlet />
    </div>
    </>
  );
}

export default App;
