import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService'
import './PageStyles.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Email ve parola gerekli.')
      return
    }

    try {
      setLoading(true)
      await login(email.trim(), password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Giriş başarısız'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-shell auth-shell">
      <div className="auth-layout">
        <section className="auth-hero">
          <span className="pill">Workflow Engine</span>
          <h1 className="hero-title">Tüm onay süreçlerini tek merkezden yönetin.</h1>
          <p className="hero-subtitle">
            Talepleri hızla görün, onaylayın veya reddedin. Süreçler anlık olarak
            güncellensin, ekipler senkron kalsın.
          </p>
          <div className="hero-highlights">
            <div>
              <h3>Akıllı Akışlar</h3>
              <p>Yetkiler JWT ile doğrulanır, kullanıcı bilgisi backend’den alınır.</p>
            </div>
            <div>
              <h3>Gerçek Zamanlı Durum</h3>
              <p>Her adım şeffaf; red gerekçeleri tek ekranda.</p>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <h2>Giriş yap</h2>
          <p className="subtitle">Email ve parola ile devam edin.</p>
          <form onSubmit={handleSubmit} className="form">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email@sirket.com"
              />
            </label>
            <label>
              Parola
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Parolanız"
              />
            </label>
            {error ? <p className="error">{error}</p> : null}
            <button type="submit" disabled={loading}>
              {loading ? 'Giriş yapılıyor...' : 'Giriş yap'}
            </button>
          </form>
          <div className="auth-footer">
            <span>Yetkili hesaplar ile erişim</span>
            <span className="dot" />
            <span>Güvenli oturum</span>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Login
