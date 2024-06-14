import "./App.css"
import { Route, Routes } from "react-router-dom"
import Events from "./pages/events"
import Register from "./pages/register"
import Login from "./pages/login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Events />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
