import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { clearToken } from '../services/authService'
import { getCurrentUser, type CurrentUser } from '../api/usersApi'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState<CurrentUser | null>(null)

  useEffect(() => {
    let active = true

    const loadUser = async () => {
      try {
        const data = await getCurrentUser()
        if (active) {
          setUser(data)
        }
      } catch {
        if (active) {
          setUser(null)
        }
      }
    }

    loadUser()

    return () => {
      active = false
    }
  }, [])

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
      <div className="navbar-user">
        {user ? (
          <div className="user-meta">
            <span className="user-name">{user.adSoyad}</span>
            <span className="user-role">{user.rol} • {user.birim}</span>
          </div>
        ) : (
          <div className="user-meta">
            <span className="user-name">Kullanıcı</span>
            <span className="user-role">Yükleniyor...</span>
          </div>
        )}
        <button type="button" className="ghost-button" onClick={handleLogout}>
          Çıkış yap
        </button>
      </div>
    </nav>
  )
}

export default Navbar
