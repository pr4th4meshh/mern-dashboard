import "./App.css"
import { Route, Routes } from "react-router-dom"
import Events from "./pages/events"
import Register from "./pages/register"
import Login from "./pages/login"
import MainLayout from "./components/layouts/MainLayout"
import Profile from "./pages/profile"

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>Page not found :(</h1>} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Events />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
