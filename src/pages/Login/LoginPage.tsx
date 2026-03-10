import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth'
import MessageBox from '../../components/MessageBox'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const result = await login(email, password)

      if (result.success) {
        localStorage.setItem('accessToken', result.accessToken)
        localStorage.setItem('refreshToken', result.refreshToken)
        setSuccess(result.message || 'Giriş başarılı')
        navigate('/dashboard')
      } else {
        setError(result.message || 'Giriş başarısız')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Giriş başarısız'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-panel">
        <div className="login-brand">
          <div className="brand-mark" />
          <div>
            <p className="brand-kicker">Şirket Portalı</p>
            <h1>Hoş geldiniz</h1>
            <p className="brand-subtitle">
              Ekibinizin tüm uygulamalarına tek kapıdan güvenli erişim.
            </p>
          </div>
        </div>

        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-header">
            <h2>Giriş yap</h2>
            <p>Kurumsal e-posta ve parolanız ile devam edin.</p>
          </div>

          <label className="login-field">
            <span>E-posta</span>
            <input
              type="email"
              name="email"
              placeholder="ornek@firma.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className="login-field">
            <span>Parola</span>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          <button className="login-submit" type="submit" disabled={loading}>
            {loading ? 'Giriş yapılıyor...' : 'Giriş yap'}
          </button>

          {error ? (
            <MessageBox
              title="Giriş başarısız"
              message={error}
              variant="error"
              onClose={() => setError('')}
            />
          ) : null}
          {success ? (
            <MessageBox
              title="Giriş başarılı"
              message={success}
              variant="success"
              onClose={() => setSuccess('')}
            />
          ) : null}

          <div className="login-footer">
            <span>Destek mi lazım?</span>
            <button type="button" className="link-button">
              BTK Destek
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
