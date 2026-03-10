import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login/LoginPage'
import DashboardPage from './pages/Dashboard/DashboardPage'

type RequireAuthProps = {
  children: ReactNode
}

function RequireAuth({ children }: RequireAuthProps) {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
