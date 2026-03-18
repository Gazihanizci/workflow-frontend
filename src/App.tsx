import type { ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import GelenTalepler from './pages/GelenTalepler'
import Taleplerim from './pages/Taleplerim'
import TalepOlustur from './pages/TalepOlustur'
import { getToken } from './services/authService'

type RequireAuthProps = {
  children: ReactNode
}

function RequireAuth({ children }: RequireAuthProps) {
  const token = getToken()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  const location = useLocation()
  const token = getToken()
  const isLoginRoute = location.pathname === '/login'

  if (!token && !isLoginRoute) {
    return <Navigate to="/login" replace />
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/talep-olustur"
        element={
          <RequireAuth>
            <TalepOlustur />
          </RequireAuth>
        }
      />
      <Route
        path="/gelen"
        element={
          <RequireAuth>
            <GelenTalepler />
          </RequireAuth>
        }
      />
      <Route
        path="/taleplerim"
        element={
          <RequireAuth>
            <Taleplerim />
          </RequireAuth>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
