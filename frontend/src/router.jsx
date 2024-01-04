import { createBrowserRouter, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import Order from "./pages/Order";
import Channels from "./pages/Channels";
import Dashboard from "./pages/Dashboard";
import App from "./App";
import ConfirmationPage from "./pages/ConformationPage";
import AddProdForm from "./components/AddProdForm";
import ProductView from "./pages/ProductView";
import OrderView from "./pages/OrderView"
import { AiComponent } from "./components/AIComponents/AIComponent";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/addproduct",
        element: <AddProdForm />,
      },
      {
        path:"/product/:productId",
        element:<ProductView />
      },
      {
        path:"/orders/:orderId",
        element:<OrderView />
      },
      {
        path:"/products/:productId",
        element:<ProductView />
      },
      {
        path: "/orders",
        element: <Order />,
      },
      {
        path: "/channels",
        element: <Channels />,
      },
      {
        path: "/ai",
        element: <AiComponent />,
      },
      {
        path: "/confirmation/:channelId",
        element: <ConfirmationPage />,
      },
    ],
  },
]);
