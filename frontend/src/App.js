import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Routes/Dashboard";
import Products from "./Routes/Products";
import ErrorPage from "./Routes/404";
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
    <Sidebar />
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index path ="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
