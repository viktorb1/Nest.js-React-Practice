
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';
import RedirectToUsers from './components/RedirectToUsers';
import Links from './pages/Links';
import Products from './pages/products/Products';
import { ProductForm } from './pages/products/ProductForm';
import Orders from './pages/Orders';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToUsers />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id/links" element={<Links />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/create" element={<ProductForm/>} />
        <Route path="/products/:id/edit" element={<ProductForm/>} />
        <Route path="/orders" element={<Orders/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
