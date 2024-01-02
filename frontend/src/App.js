import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Routes/Dashboard";
import Products from "./Routes/Products";
import ErrorPage from "./Routes/404";

function App() {
  return (
    <div className="App">
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
