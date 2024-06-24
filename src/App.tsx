import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/dashboard/Home"
import { Login } from "./pages/authentication/Login"
import { Signup } from "./pages/authentication/Signup"
import { ResetPasswordForm } from "./pages/authentication/Reset"
import { Verify } from "./pages/authentication/Verify"

function App() {
  return (
  <>
    <Routes>
      <Route path="/home" element={<HomePage />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/reset" element={<ResetPasswordForm/>}/>
      <Route path="/verify" element={<Verify/>}/>
    </Routes>
  </>
  )
}

export default App
