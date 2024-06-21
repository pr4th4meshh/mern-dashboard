import "./App.css"
import { Route, Routes } from "react-router-dom"
import Register from "./pages/register"
import Login from "./pages/login"
import MainLayout from "./components/layouts/MainLayout"
import Profile from "./pages/profile"
import PrivateRoute from "./utils/PrivateRoute"
import Products from "./pages/products"
import Dashboard from "./pages/dashboard"
import NotFoundComponent from "./components/ui/NotFound"
import SingleProduct from "./pages/single-product/SingleProduct"
import Users from "./pages/users"

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFoundComponent pageTitle={"Page"} />} />
     <Route element={<PrivateRoute />} >
     <Route element={<MainLayout />}>
        <Route path="/" element={<Products />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/product/id/:id" element={<SingleProduct />} />
      </Route>
     </Route>
    </Routes>
  )
}

export default App
