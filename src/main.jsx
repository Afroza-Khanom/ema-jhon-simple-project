import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/shop/Shop';
import Home from './components/layout/Home';
import Orders from './components/orders/Orders';
import Inventory from './components/inventory/Inventory';
import Login from './components/login/Login';
import cartProductsLoader from './loaders/CartProducts';
import CheckOut from './components/checkout/CheckOut';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path:'/',
        element:<Shop></Shop>
      },
      {
        path:'orders',
        element: <Orders></Orders>,
        loader: cartProductsLoader
      },
      {
        path:'inventory',
        element:<Inventory></Inventory>
      },
      {
        path: 'checkout',
        element: <CheckOut></CheckOut>
      },
      {
        path: 'login',
        element: <Login></Login>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
