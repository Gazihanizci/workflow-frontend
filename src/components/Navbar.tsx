import { NavLink, useNavigate } from 'react-router-dom'
import { clearToken } from '../services/authService'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearToken()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-dot" />
        Workflow Engine
      </div>
      <div className="navbar-links">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
          Dashboard
        </NavLink>
        <NavLink to="/talep-olustur" className={({ isActive }) => (isActive ? 'active' : '')}>
          Talep Oluştur
        </NavLink>
        <NavLink to="/gelen" className={({ isActive }) => (isActive ? 'active' : '')}>
          Gelen Talepler
        </NavLink>
        <NavLink to="/taleplerim" className={({ isActive }) => (isActive ? 'active' : '')}>
          Taleplerim
        </NavLink>
      </div>
      <button type="button" className="ghost-button" onClick={handleLogout}>
        Çıkış yap
      </button>
    </nav>
  )
}

export default Navbar
